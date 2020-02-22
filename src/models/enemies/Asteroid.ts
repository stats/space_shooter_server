import { Enemy } from '../enemy';
import { GameState} from '../../models/GameState';
import { StraightLinePath } from '../../behaviours/enemy/movement/StraightLinePath';
import { CT } from '../../constants';

export class Asteroid extends Enemy {

  constructor(options) {
    super(options);
    this.health_base = 999;
    this.health_growth = 0;

    this.speed_base = 30;
    this.speed_growth = 2;

    this.collision_damage_base = 1;
    this.collision_damage_growth = 0;

    this.model_type = "asteroid" + Math.ceil(Math.random() * 3);

    this.radius = 30;
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviours([new StraightLinePath(this)]);
  }

}
