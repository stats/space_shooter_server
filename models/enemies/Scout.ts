import { Enemy } from '../enemy';

export class Scout extends Enemy {

  constuctor(options) {
    this.health = 1;
    this.speed = 1;
    this.collision_damage = 1;
    
    this.registerBehaviour(new StraightLinePath(this));
  }

}
