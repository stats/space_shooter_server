import { TimedPosition, Pattern } from '../../Internal';

export class SideDiagonalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();

    const i = Math.random() > 0.5 ? 1800 : -200;

    let a: number[] = [0, 2, 4, 6, 8, 10];
    if( Math.random() > 0.5) a = a.reverse();

    this.points = [
      new TimedPosition(a[0], i, 800),
      new TimedPosition(a[1], i, 700),
      new TimedPosition(a[2], i, 600),
      new TimedPosition(a[3], i, 500),
      new TimedPosition(a[3], i, 400),
      new TimedPosition(a[3], i, 300),
    ];
    this.maxTime = enemyCount * 2 + 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
