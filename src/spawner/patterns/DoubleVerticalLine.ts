import { TimedPosition, Pattern } from '../../Internal';

export class DoubleVerticalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    const column1 = Math.floor(Math.random() * 15);
    let column2 = Math.floor(Math.random() * 15);
    while( column1 == column2 ) {
      column2 = Math.floor(Math.random() * 15);
    }
    this.points = [];
    for(let i = 0; i < 8; i++) {
      this.points.push(new TimedPosition(i * 2, 100 + column1 * 100, 1100))
      this.points.push(new TimedPosition(i * 2, 100 + column2 * 100, 1100))
    }
    this.maxTime = enemyCount + 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
