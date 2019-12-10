import { Formation } from './formation';
import { C } from '../../constants';
import { Scout } from '../../models/enemies/scout';

export class RandomFormation extends Formation {

  onSpawnEnemies(spawn_type:any) {

    let spawns = 3;
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

    for(var i = 0; i < spawns; i++) {
      let side:number = Math.floor(Math.random() * 3);
      let start_x:number, start_y:number;
      switch(side) {
        case 0:
          start_y = C.BOUNDS.maxY + C.SPAWN_OFFSET + (Math.random() * C.SPAWN_OFFSET * 10);
          start_x = (Math.random() * (C.BOUNDS.maxX - 200)) + 100;
          break;
        case 1:
          start_y = (Math.random() * (C.BOUNDS.maxY/2 - 200)) + 100;
          start_x = -C.SPAWN_OFFSET - (Math.random() * C.SPAWN_OFFSET * 10) + C.BOUNDS.maxY/2;
          break;
        case 2:
          start_y = (Math.random() * (C.BOUNDS.maxY/2 - 200)) + 100;
          start_x = C.BOUNDS.maxX + C.SPAWN_OFFSET + (Math.random() * C.SPAWN_OFFSET * 10) + C.BOUNDS.maxY/2;
          break;
      }
      this.state.addEnemy(new spawn_type({x: start_x , y: start_y }));
    }
  }

}
