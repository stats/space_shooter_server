import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class SideLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    const i = Math.random() > 0.5 ? 1800 : -200;
    this.points = [
      new TimedPosition(0, i, 800),
      new TimedPosition(0, i, 700),
      new TimedPosition(0, i, 600),
      new TimedPosition(0, i, 500),
      new TimedPosition(0, i, 400),
      new TimedPosition(0, i, 300),
    ];
    this.maxTime = 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
