import { Enemy } from '../Enemy';
import { StraightLinePath } from '../../behaviours/Enemy/movement/StraightLinePath';

export class Scout extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 3;
    this.healthGrowth = 0.1;

    this.speedBase = 85;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "scout";

    this.radius = 30;
  }

  onInitGame(state: any): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new StraightLinePath(this));
  }

}
