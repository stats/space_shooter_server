import { TimedPosition } from '../TimedPosition';
import { Pattern } from '../Pattern';

export class VerticalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    super();
    const column = Math.floor(Math.random() * 15);
    this.points = [];
    for(let i = 0; i < 8; i++) {
      this.points.push(new TimedPosition(i * 2, 100 + column * 100, 1100))
    }
    this.maxTime = (2 * enemyCount);
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
