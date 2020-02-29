import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { Ship } from '../../../models/Ship';
import { CollisionHelper } from '../../../helpers/CollisionHelper';
import { Entity } from '../../../models/Entity';
import { Enemy } from '../../../models/Enemy';

export class ClosestPlayerPath extends Behaviour {

  targetPlayer: Ship;
  theta: number;
  enteredScreen = false;

  target: Enemy;

  constructor(target: Enemy) {
    super('ClosestPlayerPath', target);
    this.targetPlayer = this.target.$state.getClosestShip(this.target.position.x, this.target.position.y);
    let dx: number, dy: number;
    if(this.targetPlayer == null){
      dx = ( C.BOUNDS.maxX / 2 ) - this.target.position.x;
      dy = ( C.BOUNDS.maxY / 2 ) - this.target.position.y;
    }
    else {
      dx = this.target.position.x - this.targetPlayer.position.x;
      dy = this.target.position.y - this.targetPlayer.position.y;
    }
    this.theta = Math.atan2(dy, dx);
    this.target.angle = this.theta;
  }

  onUpdate(deltaTime): void {
    this.targetPlayer = this.target.$state.getClosestShip(this.target.position.x, this.target.position.y);
    if(this.targetPlayer != null) {
      const dx = this.target.position.x - this.targetPlayer.position.x;
      const dy = this.target.position.y - this.targetPlayer.position.y;
      this.theta = Math.atan2(dy, dx);
      this.target.angle = this.theta;
    }

    this.target.position.x += -Math.cos(this.theta) * this.target.speed * deltaTime/1000;
    this.target.position.y += -Math.sin(this.theta) * this.target.speed * deltaTime/1000;

    if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
      this.enteredScreen = true;
    }
    if(this.enteredScreen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

}
