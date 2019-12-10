import { Formation } from './formation';
import { C } from '../../constants';

export class TriangleFormation extends Formation {

  positions:any = [
    [0,0],
    [40, -20],
    [40, 20],
    [80, -40],
    [80, 0],
    [80, 40],
    [120, -60],
    [120, -20],
    [120, 20],
    [120, 60],
    [160, -80],
    [160, -40],
    [160, 0],
    [160, 40],
    [160, 80]
  ];

  onSpawnEnemies(spawn_type:any, allowed_sides?:number[]) {
    let side:number, spawns:number, i:number, start_x:number, start_y:number;

    side = this.getRandomSide();
    [start_x, start_y] = this.getStartPositions(side);

    spawns = 1;
    if(this.state.current_wave > 5) {
      spawns = 3;
    } else if (this.state.current_wave > 10 ) {
      spawns = 6;
    } else if (this.state.current_wave > 20 ) {
      spawns = 10;
    } else if (this.state.current_wave > 30 ) {
      spawns = 15;
    }

    this.spawnEnemy(side, spawns, spawn_type);

  }

}
