import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class AlternatingSide extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number, timeOffset = 0, positionOffset = 0 ) {
    super();
    const i = Math.random() > 0.5 ? 1800 : -200;
    const j = i == 1800 ? -200 : 1800;
    this.points = [
      new TimedPosition(0 + timeOffset, i, 800),
      new TimedPosition(0 + timeOffset, j, 700),
      new TimedPosition(0 + timeOffset, i, 600),
      new TimedPosition(0 + timeOffset, j, 500),
      new TimedPosition(0 + timeOffset, i, 400),
      new TimedPosition(0 + timeOffset, j, 300),
    ];
    this.maxTime = 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
    this.positionOffset = positionOffset;
  }

}
