import { Enemy } from '../Enemy';
import { ClosestPlayerPath } from '../../behaviours/Enemy/movement/ClosestPlayerPath';

export class Tracker extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 3;
    this.healthGrowth = 0.1;

    this.speedBase = 75;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "tracker";

    this.radius = 40;
  }

  onInitGame(state: any): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new ClosestPlayerPath(this));
  }

}
