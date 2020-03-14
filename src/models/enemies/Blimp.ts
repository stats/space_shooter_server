import { Enemy } from '../Enemy';
import { SimpleFlockingPath } from '../../behaviours/Enemy/movement/SimpleFlockingPath';

export class Blimp extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 3;
    this.healthGrowth = 0.1;

    this.speedBase = 75;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "blimp";

    this.radius = 40;
  }

  onInitGame(state: any): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new SimpleFlockingPath(this, {destination:this.destination, flock:this.flock}));
  }

}
