import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class RightSideLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    this.points = [
      new TimedPosition(0, 1800, 800),
      new TimedPosition(0, 1800, 600),
      new TimedPosition(0, 1800, 400),
      new TimedPosition(0, 1800, 200),
    ];
    this.maxTime = 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
