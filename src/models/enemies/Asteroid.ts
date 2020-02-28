import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { StraightLinePath } from '../../behaviours/Enemy/movement/StraightLinePath';
import { CT } from '../../Constants';

export class Asteroid extends Enemy {

  constructor(options) {
    super(options);
    this.healthBase = 999;
    this.healthGrowth = 0;

    this.speedBase = 30;
    this.speedGrowth = 2;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0;

    this.modelType = "asteroid" + Math.ceil(Math.random() * 3);

    this.radius = 30;
  }

  onInitGame(state: GameState) {
    super.onInitGame(state);
    this.registerBehaviours([new StraightLinePath(this)]);
  }

}
