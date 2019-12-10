import { GameState } from '../../models/GameState';
import { C } from '../../constants';

export class Formation {

  protected state:GameState;

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
}
