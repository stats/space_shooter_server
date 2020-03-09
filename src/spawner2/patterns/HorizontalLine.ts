import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class HorizontalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    this.points = [
      new TimedPosition(0, 900, 1100),
      new TimedPosition(0, 700, 1100),
      new TimedPosition(0, 1100, 1100),
      new TimedPosition(0, 500, 1100),
      new TimedPosition(0, 1300, 1100),
      new TimedPosition(0, 300, 1100),
      new TimedPosition(0, 1500, 1100),
      new TimedPosition(0, 100, 1100),
    ];
    this.maxTime = 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
