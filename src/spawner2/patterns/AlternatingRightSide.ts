import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class AlternatingRightSide extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number, timeOffset: number = 0, positionOffset: number = 0 ) {
    super();
    this.points = [
      new TimedPosition(0 + timeOffset, 1800, 800),
      new TimedPosition(0 + timeOffset, -200, 600),
      new TimedPosition(0 + timeOffset, 1800, 400),
      new TimedPosition(0 + timeOffset, -200, 200),
    ];
    this.maxTime = 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
    this.positionOffset = positionOffset;
  }

}
