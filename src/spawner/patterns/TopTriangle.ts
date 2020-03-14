import { TimedPosition, Pattern } from '../../Internal';

export class TopTriangle extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();

    this.points = [
      new TimedPosition(0, 800, 1100),
      new TimedPosition(2, 700, 1100),
      new TimedPosition(2, 900, 1100),
      new TimedPosition(4, 600, 1100),
      new TimedPosition(4, 800, 1100),
      new TimedPosition(4, 1000, 1100),
      new TimedPosition(6, 500, 1100),
      new TimedPosition(6, 700, 1100),
      new TimedPosition(6, 900, 1100),
      new TimedPosition(6, 1100, 1100),
    ];

    if(enemyCount > 6) this.maxTime = 8;
    else if (enemyCount > 3 ) this.maxTime = 6;
    else if (enemyCount > 1 ) this.maxTime = 4;
    else this.maxTime = 2;

    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
