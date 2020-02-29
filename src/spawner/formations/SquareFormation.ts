import { Formation } from './Formation';
import { Enemy } from '../../models/Enemy';
import { Position } from '../../models/Position';

export class SquareFormation extends Formation {

  positions: any = [
    [-60,0], [0,0], [60,0],
    [-60,60], [0,60], [60,60],
    [-120, 0], [120,0], [-120, 60], [120, 60],
    [-120, 120], [-60, 120], [0, 120], [60, 120], [120, 120],
    [-120, 180], [-60, 180], [0, 180], [-60, 180], [120, 180]
  ];

  onSpawnEnemies(spawnType: any, allowedSides?: number[]): void {
    const side: number = this.getRandomSide(allowedSides);
    let spawns: number;

    const position: Position = this.getStartPositions(side);

    spawns = 3;
    if(this.state.currentWave > 5) {
      spawns = 6;
    } else if (this.state.currentWave > 15 ) {
      spawns = 10;
    } else if (this.state.currentWave > 30 ) {
      spawns = 15;
    } else if (this.state.currentWave > 40 ) {
      spawns = 20;
    }

    this.spawnEnemies(position, side, spawns, spawnType);
  }

}
