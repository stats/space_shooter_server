import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { SimpleFlockingPath } from '../../behaviours/Enemy/movement/SimpleFlockingPath';
import { CT } from '../../Constants';

export class Blimp extends Enemy {

  constructor(options) {
    super(options);
    this.health_base = 1;
    this.health_growth = 0.1;

    this.speed_base = 75;
    this.speed_growth = 5;

    this.collision_damage_base = 1;
    this.collision_damage_growth = 0.1;

    this.model_type = "blimp";

    this.radius = 30;
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviours([new SimpleFlockingPath(this, {destination:this.destination, flock:this.flock})]);
  }

}
