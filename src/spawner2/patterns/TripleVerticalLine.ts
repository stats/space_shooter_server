import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class TripleVerticalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    const column1 = Math.floor(Math.random() * 15);
    let column2 = Math.floor(Math.random() * 15);
    let column3 = Math.floor(Math.random() * 15);
    while( column1 == column2 ) {
      column2 = Math.floor(Math.random() * 15);
    }
    while( column3 == column2 || column3 == column1) {
      column3 = Math.floor(Math.random() * 15);
    }

    this.points = [];
    for(var i = 0; i < 8; i++) {
      this.points.push(new TimedPosition(i * 2, 100 + column1 * 100, 1100))
      this.points.push(new TimedPosition(i * 2, 100 + column2 * 100, 1100))
      this.points.push(new TimedPosition(i * 2, 100 + column3 * 100, 1100))
    }
    this.maxTime = Math.ceil(2 * (enemyCount/3)) + 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
