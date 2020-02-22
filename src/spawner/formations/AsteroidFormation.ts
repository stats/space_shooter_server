import { Formation } from './formation';
import { C, S } from '../../constants';

export class AsteroidFormation extends Formation {

  onSpawnEnemies(spawn_type:any, allowed_sides?:number[]) {

    let i:number, spawns:number;
    spawns = 2;
    if(this.state.current_wave > 3) {
      spawns = 3;
    } else if (this.state.current_wave > 5 ) {
      spawns = 4;
    } else if (this.state.current_wave > 7 ) {
      spawns = 5;
    } else if (this.state.current_wave > 10 ) {
      spawns = 6;
    } else if (this.state.current_wave > 15 ) {
      spawns = 7;
    } else if (this.state.current_wave > 20 ) {
      spawns = 8;
    }

    let start_x:number, start_y:number;
    
    for(i = 0; i < spawns; i++) {
      start_x = this.randomX();
      start_y = this.topOffset() + (Math.random() * C.SPAWN_OFFSET * 3);
      this.state.addEnemy(new spawn_type({x: start_x , y: start_y }));
    }
  }

}
