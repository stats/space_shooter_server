import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class BothSideLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number, timeOffset = 0, positionOffset = 0 ) {
    super();
    this.points = [
      new TimedPosition(0 + timeOffset, -200, 800),
      new TimedPosition(0 + timeOffset, 1800, 800),
      new TimedPosition(0 + timeOffset, -200, 700),
      new TimedPosition(0 + timeOffset, 1800, 700),
      new TimedPosition(0 + timeOffset, -200, 600),
      new TimedPosition(0 + timeOffset, 1800, 600),
      new TimedPosition(0 + timeOffset, -200, 500),
      new TimedPosition(0 + timeOffset, 1800, 500),
      new TimedPosition(0 + timeOffset, -200, 400),
      new TimedPosition(0 + timeOffset, 1800, 400),
      new TimedPosition(0 + timeOffset, -200, 300),
      new TimedPosition(0 + timeOffset, 1800, 300),
    ];
    this.maxTime = 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
    this.positionOffset = positionOffset;
  }

}
