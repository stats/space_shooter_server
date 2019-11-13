import { Enemy } from '../enemy';
import { GameRoom } from '../../rooms/GameRoom';

export class Scout extends Enemy {

  constuctor(options) {
    this.health = 1;
    this.speed = 1;
    this.collision_damage = 1;

  }

  onInitGame(room:GameRoom) {
    super.onInitGame(room);
    this.registerBehaviour(new StraightLinePath(this));
  }

}
