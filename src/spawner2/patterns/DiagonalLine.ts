import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class DiagonalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    let a: number[] = [0, 2, 4, 6, 8, 10, 12, 14];
    if( Math.random() > 0.5) a = a.reverse();
    this.points = [
      new TimedPosition(a[0], 100, 1100),
      new TimedPosition(a[1], 300, 1100),
      new TimedPosition(a[2], 500, 1100),
      new TimedPosition(a[3], 700, 1100),
      new TimedPosition(a[4], 900, 1100),
      new TimedPosition(a[5], 1100, 1100),
      new TimedPosition(a[6], 1300, 1100),
      new TimedPosition(a[7], 1500, 1100),
    ];
    this.maxTime = 16;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
