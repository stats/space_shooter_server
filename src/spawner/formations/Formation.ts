import { GameState } from '../../models/GameState';
import { Enemy } from '../../models/Enemy';
import { C, S } from '../../Constants';
import { sample } from 'lodash';

export class Formation {

  protected state: GameState;
  protected positions: Array<Array<number, number>>;

  constructor( state: GameState ) {
    this.state = state;
  }

  onSpawnEnemies(spawnType: Enemy, allowedSides?: number[]): void {
    // Do nothing.
  }

  protected randomX(): number {
    return (Math.random() * (C.BOUNDS.maxX - 200)) + 100;
  }

  protected randomY(): number {
    return (Math.random() * (C.BOUNDS.maxY/2 - 200)) + 100 + C.BOUNDS.maxY/2;
  }

  protected topOffset(): number {
    return C.BOUNDS.maxY + C.SPAWN_OFFSET;
  }

  protected leftOffset(): number {
    return -C.SPAWN_OFFSET;
  }

  protected rightOffset(): number {
    return C.BOUNDS.maxX + C.SPAWN_OFFSET;
  }

  protected getStartPositions(side: number): number[] {
    let startX: number, startY: number;
    switch(side) {
      case S.TOP:
        startY = this.topOffset();
        startX = this.randomX();
        break;
      case S.LEFT:
        startY = this.randomY();
        startX = this.leftOffset();
        break;
      case S.RIGHT:
        startY = this.randomY();
        startX = this.rightOffset();
        break;
    }
    return [startX, startY];
  }

  protected getRandomSide(allowedSides?: number[]): number {
    if (allowedSides) {
      return sample(allowedSides);
    } else {
      return Math.floor(Math.random() * 3);
    }
  }

  protected spawnEnemies(startX: number, startY: number, side: number, spawns: number, spawnType: Enemy): void {
    let i: number;
    for(i = 0; i < spawns; i++) {
      switch(side) {
        case S.TOP:
          this.state.addEnemy(new spawnType({x: startX + this.positions[i][0], y: startY + this.positions[i][1]}));
        break;
        case S.LEFT:
          this.state.addEnemy(new spawnType({x: startX - this.positions[i][1], y: startY + this.positions[i][0]}));
        break;
        case S.RIGHT:
          this.state.addEnemy(new spawnType({x: startX + this.positions[i][1], y: startY - this.positions[i][0]}));
        break;
      }
    }
  }
}
