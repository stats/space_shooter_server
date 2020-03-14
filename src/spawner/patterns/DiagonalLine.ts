import { TimedPosition, Pattern } from '../../Internal';

export class DiagonalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    let a: number[] = [];
    for(let i = 0; i < 15; i++) {
      a.push(i * 2);
    }
    if( Math.random() > 0.5) a = a.reverse();
    this.points = [];
    for(let i = 0; i < 15; i++) {
      this.points.push(new TimedPosition(a[i], (i+1) * 100, 1100));
    }
    this.maxTime = enemyCount * 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
