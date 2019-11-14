import { Enemy } from '../enemy';
import { GameState} from '../../models/GameState';
import { StraightLinePath } from '../../behaviours/enemy/StraightLinePath';

export class Scout extends Enemy {

  constructor(options) {
    super(options);
    this.health = 1;
    this.speed = 1;
    this.collision_damage = 1;
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviour(new StraightLinePath(this));
  }

}
