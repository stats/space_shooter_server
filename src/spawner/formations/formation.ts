import { GameState } from '../../models/GameState';

export class Formation {

  protected state:GameState;

  constructor(state:GameState) {
    this.state = state;
  }

  onSpawnEnemies(spawn_type:any) {}


}
