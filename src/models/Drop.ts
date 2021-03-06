import { type } from "@colyseus/schema";
import { Entity } from './Entity';
import { DestroyedBehaviour } from '../behaviours/drop/DestroyedBehaviour';
import { MoveToLocationPath } from '../behaviours/drop/MoveToLocationPath';
import { DespawnAfterTime } from '../behaviours/drop/DespawnAfterTime';
import { Crystals } from '../Crystals';
import { C } from '../Constants';

export class Drop extends Entity {

  speed = 65;
  radius = 25;

  @type("string")
  modelType = "";

  constructor(options) {
    super(options);
    const r = Math.floor(Math.random() * 4);

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

  onInitGame(state: any): void {
    super.onInitGame(state);
    this.registerBehaviour("destroyed", new DestroyedBehaviour(this));
    this.registerBehaviour("path", new MoveToLocationPath(this, C.CENTER_OF_SCREEN.clone()));
    this.registerBehaviour("despawn", new DespawnAfterTime(this));
  }

}
