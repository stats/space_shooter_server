import { Enemy } from '../enemy';
import { GameState} from '../../models/GameState';
import { ClosestPlayerPath } from '../../behaviours/enemy/movement/MoveToLocationThenRotatePath';
import { CT } from '../../constants';
import { Position } from '../../models/Position';


export class Tank extends Enemy {

  moveTo:Postiion;

  constructor(options) {
    super(options);
    this.health_base = 1;
    this.health_growth = 0.1;

    this.speed_base = 75;
    this.speed_growth = 5;

    this.collision_damage_base = 1;
    this.collision_damage_growth = 0.1;

    this.model_type = "tank";

    this.radius = 30;

    this.moveTo = options.moveTo || Position.randomOnScreen();
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviours([new MoveToLocationThenPath(this, args: { moveTo: this.moveTo })]);
  }

}
