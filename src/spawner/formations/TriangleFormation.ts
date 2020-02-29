import { Formation } from './Formation';
import { Position } from '../../models/Position';

export class TriangleFormation extends Formation {

  positions: any = [
    [0,0],
    [-30, 100], [30, 100],
    [-60, 200], [0, 200], [60, 200],
    [-90,300],[-30, 300], [30, 300], [90, 300],
    [-120, 400], [-60, 400], [0, 0], [60, 400], [120, 400]
  ];

  onSpawnEnemies(spawnType: any, allowedSides?: number[]): void {
    const side: number = this.getRandomSide(allowedSides);

    const position: Position = this.getStartPositions(side);

    let spawns = 3;
    if(this.state.currentWave > 5) {
      spawns = 6;
    } else if (this.state.currentWave > 10 ) {
      spawns = 10;
    } else if (this.state.currentWave > 20 ) {
      spawns = 15;
    }

    this.spawnEnemies(position, side, spawns, spawnType);
  }

}
