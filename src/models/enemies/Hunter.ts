import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { ClosestPlayerAtStartPath } from '../../behaviours/Enemy/movement/ClosestPlayerAtStartPath';

export class Hunter extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 4;
    this.healthGrowth = 0.1;

    this.speedBase = 75;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "hunter";

    this.radius = 30;
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new ClosestPlayerAtStartPath(this));
  }

}
