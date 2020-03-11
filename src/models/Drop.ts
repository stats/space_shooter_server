import { Entity } from './Entity';

export class Drop extends Entity {

  speed: number = 65;
  radius: number = 25;

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("destroyed", new DestroyedBehaviour(this));
  }

}
