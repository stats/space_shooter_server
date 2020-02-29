import { GameState } from '../../models/GameState';
import { Enemy } from '../../models/Enemy';
import { C, S } from '../../Constants';
import { sample } from 'lodash';
import { Position } from '../../models/Position';

export class Formation {

  protected state: GameState;
  protected positions: any;

  constructor( state: GameState ) {
    this.state = state;
  }

  onSpawnEnemies(spawnType: any, allowedSides?: number[]): void {
    // Do nothing.
  }

  protected randomX(): number {
    return (Math.random() * (C.BOUNDS.maxX - 200)) + 100;
  }

  protected randomY(): number {
    return (Math.random() * (C.BOUNDS.maxY/2 - 200)) + 100 + C.BOUNDS.maxY/2;
  }

  protected topOffset(): number {
    return C.BOUNDS.maxY + ( C.SPAWN_OFFSET * 2 );
  }

  protected leftOffset(): number {
    return -C.SPAWN_OFFSET * 2;
  }

  protected rightOffset(): number {
    return C.BOUNDS.maxX + ( C.SPAWN_OFFSET * 2 );
  }

  protected getStartPositions(side: number): Position {
    let position = new Position(0, 0);
    switch(side) {
      case S.TOP:
        position.y = this.topOffset();
        position.x = this.randomX();
        break;
      case S.LEFT:
        position.y = this.randomY();
        position.x = this.leftOffset();
        break;
      case S.RIGHT:
        position.y = this.randomY();
        position.x = this.rightOffset();
        break;
    }
    return position;
  }

  protected getRandomSide(allowedSides?: number[]): number {
    if (allowedSides) {
      return sample(allowedSides);
    } else {
      return Math.floor(Math.random() * 3);
    }
  }

  protected spawnEnemies(start: Position, side: number, spawns: number, spawnType: any): void {
    let i: number;
    let position: Position;
    for(i = 0; i < spawns; i++) {
      switch(side) {
        case S.TOP:
          position = new Position(start.x + this.positions[i][0], start.y + this.positions[i][1])
        break;
        case S.LEFT:
          position = new Position(start.x - this.positions[i][1], start.y + this.positions[i][0]);
        break;
        case S.RIGHT:
          position = new Position(start.x + this.positions[i][1], start.y - this.positions[i][0]);
        break;
      }
      this.state.addEnemy(new spawnType({position: position}));
    }
  }
}
