import { Formation } from './Formation';
import { Position } from '../../models/Position';

export class DiagonalFormation extends Formation {

  positions: any = [
    [0,0],[60, 100],[120,200],[180,300],[240,400],[300,500],[360, 600]
  ];

  onSpawnEnemies(spawnType: any, allowedSides?: number[]): void {
    const side: number = this.getRandomSide(allowedSides);
    const position: Position = this.getStartPositions(side);

    let spawns: number;

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

    this.spawnEnemies(position, side, spawns, spawnType);
  }

}
