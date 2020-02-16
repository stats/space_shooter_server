import { Formation } from './formation';
import { C } from '../../constants';

export class DiagonalFormation extends Formation {

  positions:any = [
    [0,0],[60, 100],[120,200],[180,300],[240,400],[300,500],[360, 600]
  ];

  onSpawnEnemies(spawn_type:any, allowed_sides?:number[]) {
    let side:number, spawns:number, i:number, start_x:number, start_y:number, swap:number;

    side = this.getRandomSide(allowed_sides);
    [start_x, start_y] = this.getStartPositions(side);

    swap = Math.random() > 0.5 ? 1 : -1;

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
