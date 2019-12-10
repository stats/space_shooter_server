import { Formation } from './formation';
import { C } from '../../constants';

export class TriangleFormation extends Formation {

  positions:any = [
    [0,0],
    [-30, 100], [30, 100],
    [-60, 200], [0, 200], [60, 200],
    [-90,300],[-30, 300], [30, 300], [90, 300],
    [-120, 400], [-60, 400], [0, 0], [60, 400], [120, 400]
  ];

  onSpawnEnemies(spawn_type:any, allowed_sides?:number[]) {
    let side:number, spawns:number, i:number, start_x:number, start_y:number;

    side = this.getRandomSide(allowed_sides);
    [start_x, start_y] = this.getStartPositions(side);

    spawns = 3;
    if(this.state.current_wave > 5) {
      spawns = 6;
    } else if (this.state.current_wave > 10 ) {
      spawns = 10;
    } else if (this.state.current_wave > 20 ) {
      spawns = 15;
    }

    this.spawnEnemies(start_x, start_y, side, spawns, spawn_type);
  }

}
