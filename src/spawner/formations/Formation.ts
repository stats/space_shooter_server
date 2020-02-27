import { GameState } from '../../models/GameState';
import { C, S } from '../../Constants';
import { sample } from 'lodash';

export class Formation {

  protected state:GameState;
  protected positions:any;

  constructor(state:GameState) {
    this.state = state;
  }

  onSpawnEnemies(spawn_type:any, allowed_sizes?:number[]) {}

  protected randomX():number {
    return (Math.random() * (C.BOUNDS.maxX - 200)) + 100;
  }

  protected randomY():number {
    return (Math.random() * (C.BOUNDS.maxY/2 - 200)) + 100 + C.BOUNDS.maxY/2;
  }

  protected topOffset():number {
    return C.BOUNDS.maxY + C.SPAWN_OFFSET;
  }

  protected leftOffset():number {
    return -C.SPAWN_OFFSET;
  }

  protected rightOffset():number {
    return C.BOUNDS.maxX + C.SPAWN_OFFSET;
  }

  protected getStartPositions(side:number):number[] {
    let start_x:number, start_y:number;
    switch(side) {
      case S.TOP:
        start_y = this.topOffset();
        start_x = this.randomX();
        break;
      case S.LEFT:
        start_y = this.randomY();
        start_x = this.leftOffset();
        break;
      case S.RIGHT:
        start_y = this.randomY();
        start_x = this.rightOffset();
        break;
    }
    return [start_x, start_y];
  }

  protected getRandomSide(allowed_sides?:number[]) {
    if (allowed_sides) {
      return sample(allowed_sides);
    } else {
      return Math.floor(Math.random() * 3);
    }
  }

  protected spawnEnemies(start_x, start_y, side, spawns, spawn_type):void {
    let i:number;
    for(i = 0; i < spawns; i++) {
      switch(side) {
        case S.TOP:
          this.state.addEnemy(new spawn_type({x: start_x + this.positions[i][0], y: start_y + this.positions[i][1]}));
        break;
        case S.LEFT:
          this.state.addEnemy(new spawn_type({x: start_x - this.positions[i][1], y: start_y + this.positions[i][0]}));
        break;
        case S.RIGHT:
          this.state.addEnemy(new spawn_type({x: start_x + this.positions[i][1], y: start_y - this.positions[i][0]}));
        break;
      }
    }
  }
}
