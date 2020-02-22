import { Formation } from './formation';
import { C, S } from '../../constants';

export class RandomFormation extends Formation {

  onSpawnEnemies(spawn_type:any, allowed_sides?:number[]) {

    let i:number, spawns:number;
    spawns = 3;
    if(this.state.current_wave > 5) {
      spawns = 4;
    } else if (this.state.current_wave > 10 ) {
      spawns = 5;
    } else if (this.state.current_wave > 15 ) {
      spawns = 6;
    } else if (this.state.current_wave > 20 ) {
      spawns = 8;
    } else if (this.state.current_wave > 25 ) {
      spawns = 10;
    } else if (this.state.current_wave > 30 ) {
      spawns = 12;
    }

    for(i = 0; i < spawns; i++) {
      let side:number, start_x:number, start_y:number;
      side = this.getRandomSide(allowed_sides);
      switch(side) {
        case S.TOP:
          start_x = this.randomX();
          start_y = this.topOffset() + (Math.random() * C.SPAWN_OFFSET * 5);
          break;
        case S.LEFT:
          start_x = this.leftOffset() - (Math.random() * C.SPAWN_OFFSET * 5);
          start_y = this.randomY();
          break;
        case S.RIGHT:
          start_x = this.rightOffset() + (Math.random() * C.SPAWN_OFFSET * 5);
          start_y = this.randomY();
          break;
      }
      this.state.addEnemy(new spawn_type({x: start_x , y: start_y }));
    }
  }

}
