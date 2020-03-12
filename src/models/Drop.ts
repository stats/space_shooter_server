import { Entity } from './Entity';
import { GameState } from './GameState';
import { DestroyedBehaviour } from '../behaviours/drop/DestroyedBehaviour';
import { Crystals } from '../Crystals';

export class Drop extends Entity {

  speed: number = 65;
  radius: number = 25;

  type("string")
  modelType: string = "";



  constructor(options) {
    super(options);
    const r = Math.random() * 4;

    switch(r) {
      case 0:
        modelType = "red";
      break;
      case 1:
        modelType = "green";
      break;
      case 2:
        modelType = "blue";
      break;
      case 3:
        modelType = "purple";
      break;
    }
  }



  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("destroyed", new DestroyedBehaviour(this));
  }

}
