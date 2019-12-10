import { GameState } from '../../models/GameState';
import { C, S } from '../../constants';
import { sample } from 'lodash';

export class Formation {

  protected state:GameState;
  protected positions:any;

  constructor(state:GameState) {
    this.state = state;
  }

  onSpawnEnemies(spawn_type:any, allowed_sizes?:number[]) {}

  randomX() {
    (Math.random() * (C.BOUNDS.maxX - 200)) + 100;
  }

  randomY() {
    return (Math.random() * (C.BOUNDS.maxY/2 - 200)) + 100 + C.BOUNDS.maxY/2;

  topOffset() {
    return C.BOUNDS.maxY + C.SPAWN_OFFSET;
  }

  leftOffSet() {
    return -C.SPAWN_OFFSET;
  }

  rightOffset() {
    return C.BOUNDS.maxX + C.SPAWN_OFFSET;
  }

  getStartPoistions(side:number):number[] {
    switch(side) {
      case S.TOP:
        start_y = this.topOffset();
        start_x = this.randomX();
        break;
      case S.LEFT:
        start_y = this.randomY();
        start_x = this.leftOffset();
        break;
      case S.RIGTH:
        start_y = this.randomY();
        start_x = this.rightOffset();
        break;
    }
    return [start_x, start_y];
  }

  getRandomSide(allowed_sides?:number[]) {
    if (allowed_sides) {
      return sample(sides);
    } else {
      return Math.floor(Math.random() * 3);
    }
  }

  spawnEnemies(side, spawns, spawn_type) {
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
