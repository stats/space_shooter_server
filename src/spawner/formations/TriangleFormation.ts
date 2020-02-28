import { Formation } from './Formation';
import { Enemy } from '../../models/Enemy';

export class TriangleFormation extends Formation {

  positions: Array<Array<number, number>> = [
    [0,0],
    [-30, 100], [30, 100],
    [-60, 200], [0, 200], [60, 200],
    [-90,300],[-30, 300], [30, 300], [90, 300],
    [-120, 400], [-60, 400], [0, 0], [60, 400], [120, 400]
  ];

  onSpawnEnemies(spawnType: Enemy, allowedSides?: number[]): void {
    const side: number, startX: number, startY: number;
    let spawns: number;

    side = this.getRandomSide(allowedSides);
    [startX, startY] = this.getStartPositions(side);

    spawns = 3;
    if(this.state.currentWave > 5) {
      spawns = 6;
    } else if (this.state.currentWave > 10 ) {
      spawns = 10;
    } else if (this.state.currentWave > 20 ) {
      spawns = 15;
    }

    this.spawnEnemies(startX, startY, side, spawns, spawnType);
  }

}
