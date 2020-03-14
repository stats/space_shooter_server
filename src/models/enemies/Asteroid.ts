import { Enemy } from '../Enemy';
import { StraightLinePath } from '../../behaviours/Enemy/movement/StraightLinePath';

export class Asteroid extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 999;
    this.healthGrowth = 0;

    this.speedBase = 30;
    this.speedGrowth = 2;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0;

    this.modelType = "asteroid" + Math.ceil(Math.random() * 3);

    this.radius = 40;
  }

  onInitGame(state: any): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new StraightLinePath(this));
  }

}
