import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class VerticalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    let column = Math.floor(Math.random() * 8);
    this.points = [
      new TimedPosition(0, 100 + column * 200, 1100),
      new TimedPosition(1, 100 + column * 200, 1100),
      new TimedPosition(2, 100 + column * 200, 1100),
      new TimedPosition(3, 100 + column * 200, 1100),
      new TimedPosition(4, 100 + column * 200, 1100),
      new TimedPosition(5, 100 + column * 200, 1100),
      new TimedPosition(6, 100 + column * 200, 1100),
      new TimedPosition(7, 100 + column * 200, 1100),
    ];
    this.maxTime = enemyCount + 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
