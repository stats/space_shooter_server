import { Formation } from './formation';
import { C } from '../../constants';
import { Scout } from '../../models/enemies/scout';

export class DiagonalFormation extends Formation {

  positions:any = [
    [0,0],[20, 60],[40,120],[60,180],[80,240],[100,300],[120, 360]
  ];

  onSpawnEnemies(spawn_type:any) {
    let side:number, spawns:number, i:number, start_x:number, start_y:number, swap:number;

    side = this.getRandomSide();
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

    this.spawnEnemy(side, spawns, spawn_type);
  }

}
