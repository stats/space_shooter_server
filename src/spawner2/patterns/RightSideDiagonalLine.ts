import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class RightSideDiagonalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();

    let a: number[] = [0, 2, 4, 6];
    if( Math.random() > 0.5) a = a.reverse();

    this.points = [
      new TimedPosition(a[0], 1800, 800),
      new TimedPosition(a[1], 1800, 600),
      new TimedPosition(a[2], 1800, 400),
      new TimedPosition(a[3], 1800, 200),
    ];
    this.maxTime = 8;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
