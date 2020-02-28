import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { ClosestPlayerAtStartPath } from '../../behaviours/Enemy/movement/ClosestPlayerAtStartPath';
import { CT } from '../../Constants';


export class Speeder extends Enemy {

  constructor(options) {
    super(options);
    this.healthBase = 1;
    this.healthGrowth = 0.1;

    this.speedBase = 75;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "speeder";

    this.radius = 30;
  }

  onInitGame(state: GameState) {
    super.onInitGame(state);
    this.registerBehaviours([new ClosestPlayerAtStartPath(this)]);
  }

}
