import { Formation } from './formation';
import { C, S } from '../../constants';
import { Scout } from '../../models/enemies/scout';

export class RandomFormation extends Formation {

  onSpawnEnemies(spawn_type:any) {

    let i:number, spawns:number = 3;
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
      let side:number = Math.floor(Math.random() * 3);
      let start_x:number, start_y:number;
      switch(side) {
        case S.TOP:
          start_x = this.randomX();
          start_y = this.topOffset() + (Math.random() * C.SPAWN_OFFSET * 10);
          break;
        case S.LEFT:
          start_x = this.leftOffset() - (Math.random() * C.SPAWN_OFFSET * 10) + C.BOUNDS.maxY/2;
          start_y = this.randomY();
          break;
        case S.RIGHT:
          start_x = this.rightOffset() + (Math.random() * C.SPAWN_OFFSET * 10) + C.BOUNDS.maxY/2;
          start_y = this.randomY();
          break;
      }
      this.state.addEnemy(new spawn_type({x: start_x , y: start_y }));
    }
  }

}
