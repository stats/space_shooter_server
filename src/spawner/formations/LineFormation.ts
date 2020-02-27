import { Formation } from './Formation';
import { C } from '../../Constants';

export class LineFormation extends Formation {

  positions:any = [
    [0,0],[0,100],[0,200],[0,300],[0,400],[0,500],[0,600]
  ];

  onSpawnEnemies(spawn_type:any, allowed_sides?:number[]) {
    let side:number, spawns:number, i:number, start_x:number, start_y:number;

    side = this.getRandomSide(allowed_sides);
    [start_x, start_y] = this.getStartPositions(side);

    spawns = 3;
    if(this.state.current_wave > 5) {
      spawns = 4;
    } else if (this.state.current_wave > 10 ) {
      spawns = 5;
    } else if (this.state.current_wave > 20 ) {
      spawns = 6;
    } else if (this.state.current_wave > 30 ) {
      spawns = 7;
    }

    this.spawnEnemies(start_x, start_y, side, spawns, spawn_type);
  }

}
