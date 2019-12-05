import { Enemy } from '../enemy';
import { GameState} from '../../models/GameState';
import { StraightLinePath } from '../../behaviours/enemy/StraightLinePath';
import { CT } from '../../constants';

export class Scout extends Enemy {

  constructor(options) {
    super(options);
    this.health_base = 1;
    this.health_growth = 0.1;

    this.speed_base = 75;
    this.speed_growth = 5;

    this.collision_damage_base = 1;
    this.collision_damage_growth = 0.1;

    this.model_type = "scout";

    this.collision_type = CT.ELLIPSE;
    this.radiusX = 15;
    this.radiusY = 30;
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviours([new StraightLinePath(this)]);
  }

}
