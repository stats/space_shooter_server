import { Formation } from './Formation';
import { Enemy } from '../../models/Enemy';

export class DiagonalFormation extends Formation {

  positions: Array<Array<number, number>> = [
    [0,0],[60, 100],[120,200],[180,300],[240,400],[300,500],[360, 600]
  ];

  onSpawnEnemies(spawnType: Enemy, allowedSides?: number[]): void {
    const side: number, startX: number, startY: number;
    let spawns: number;

    side = this.getRandomSide(allowedSides);
    [startX, startY] = this.getStartPositions(side);

    swap = Math.random() > 0.5 ? 1 : -1;

    spawns = 3;
    if(this.state.currentWave > 5) {
      spawns = 4;
    } else if (this.state.currentWave > 10 ) {
      spawns = 5;
    } else if (this.state.currentWave > 20 ) {
      spawns = 6;
    } else if (this.state.currentWave > 30 ) {
      spawns = 7;
    }

    this.spawnEnemies(startX, startY, side, spawns, spawnType);
  }

}
