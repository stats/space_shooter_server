export class HorizontalLine extends Pattern {

  constructor(enemyCount: number, enemyType: any, difficulty: number ) {
    this.points = [
      new TimedPosition(1, 1500, 1100),
      new Position(1, 100),
      new Position(1, 1300),
      new Position(1, 300),
      new Position(1, 1100),
      new Position(1, 500),
      new Position(1, 900),
      new Position(1, 700),
    ];
    this.maxTime = 2;
    this.enemyCount = enemyCount;
    this.enemyType = enemyType;
    this.difficulty = difficulty;
  }

}
