import { Formation } from './Formation';
import { C } from '../../Constants';

export class LineFormation extends Formation {

  positions: any = [
    [0,0],[0,100],[0,200],[0,300],[0,400],[0,500],[0,600]
  ];

  onSpawnEnemies(spawnTpe: any, allowedSides?: number[]) {
    let side: number, spawns: number, i: number, startX: number, startY: number;

    side = this.getRandomSide(allowedSides);
    [startX, startY] = this.getStartPositions(side);

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

    this.spawnEnemies(startX, startY, side, spawns, spawnTpe);
  }

}
