import { type } from "@colyseus/schema";
import { Entity, GameState, DropDestroyedBehaviour, DropMovement, DespawnAfterTime, Crystals, Position } from '../Internal';

export class Drop extends Entity {

  speed = 65;
  radius = 25;

  @type("string")
  modelType = "";

  constructor(options) {
    super(options);
    const r = Math.random() * 4;

    switch(r) {
      case 0:
        this.modelType = "red";
      break;
      case 1:
        this.modelType = "green";
      break;
      case 2:
        this.modelType = "blue";
      break;
      case 3:
        this.modelType = "purple";
      break;
    }
  }



  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("destroyed", new DropDestroyedBehaviour(this));
    this.registerBehaviour("path", new DropMovement(this, Position.CENTER_OF_SCREEN.clone()));
    this.registerBehaviour("despawn", new DespawnAfterTime(this));
  }

}
