import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { StraightLinePath } from '../../behaviours/Enemy/movement/StraightLinePath';

export class Scout extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 1;
    this.healthGrowth = 0.1;

    this.speedBase = 75;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "scout";

    this.radius = 30;
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new StraightLinePath(this));
  }

}
