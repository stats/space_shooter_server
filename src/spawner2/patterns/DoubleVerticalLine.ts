import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class DoubleVerticalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    const column1 = Math.floor(Math.random() * 8);
    let column2 = Math.floor(Math.random() * 8);
    while( column1 == column2 ) {
      column2 = Math.floor(Math.random() * 8);
    }
    this.points = [
      new TimedPosition(0, 100 + column1 * 200, 1100),
      new TimedPosition(0, 100 + column2 * 200, 1100),
      new TimedPosition(2, 100 + column1 * 200, 1100),
      new TimedPosition(2, 100 + column2 * 200, 1100),
      new TimedPosition(4, 100 + column1 * 200, 1100),
      new TimedPosition(4, 100 + column2 * 200, 1100),
      new TimedPosition(6, 100 + column1 * 200, 1100),
      new TimedPosition(6, 100 + column2 * 200, 1100),
      new TimedPosition(8, 100 + column1 * 200, 1100),
      new TimedPosition(8, 100 + column2 * 200, 1100),
      new TimedPosition(10, 100 + column1 * 200, 1100),
      new TimedPosition(10, 100 + column2 * 200, 1100),
      new TimedPosition(12, 100 + column1 * 200, 1100),
      new TimedPosition(12, 100 + column2 * 200, 1100),
      new TimedPosition(14, 100 + column1 * 200, 1100),
      new TimedPosition(14, 100 + column2 * 200, 1100),
    ];
    this.maxTime = enemyCount + 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
