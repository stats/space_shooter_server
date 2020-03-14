import { Enemy, GameState, TargetPlayerStartPath } from '../../Internal';


export class Speeder extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 3;
    this.healthGrowth = 0.1;

    this.speedBase = 95;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "speeder";

    this.radius = 30;
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new TargetPlayerStartPath(this));
  }

}
