import { Entity } from './Entity';
import { GameState } from './GameState';
import { DestroyedBehaviour } from '../behaviours/drop/DestroyedBehaviour';

export class Drop extends Entity {

  speed: number = 65;
  radius: number = 25;

  constructor(options) {
    super(options);
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("destroyed", new DestroyedBehaviour(this));
  }

}
