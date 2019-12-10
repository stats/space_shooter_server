import { Formation } from './formation';
import { C } from '../../constants';

export class SquareFormation extends Formation {

  positions:any = [
    [-60,0], [0,0], [60,0],
    [-60,60], [0,60], [60,60],
    [-120, 0], [120,0], [-120, 60], [120, 60],
    [-120, 120], [-60, 120], [0, 120], [60, 120], [120, 120],
    [-120, 180], [-60, 180], [0, 180], [-60, 180], [120, 180]
  ];

  onSpawnEnemies(spawn_type:any, allowed_sides?:number[]) {
    let side:number, spawns:number, i:number, start_x:number, start_y:number;

    side = this.getRandomSide(allowed_sides);
    [start_x, start_y] = this.getStartPositions(side);

    spawns = 3;
    if(this.state.current_wave > 5) {
      spawns = 6;
    } else if (this.state.current_wave > 15 ) {
      spawns = 10;
    } else if (this.state.current_wave > 30 ) {
      spawns = 15;
    } else if (this.state.current_wave > 40 ) {
      spawns = 20;
    }

    this.spawnEnemies(start_x, start_y, side, spawns, spawn_type);
  }

}
