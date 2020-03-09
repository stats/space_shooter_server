import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class LeftSideLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    this.points = [
      new TimedPosition(0, -200, 800),
      new TimedPosition(0, -200, 600),
      new TimedPosition(0, -200, 400),
      new TimedPosition(0, -200, 200),
    ];
    this.maxTime = 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
