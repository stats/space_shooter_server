import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { Ship } from '../../../models/Ship';
import { CollisionHelper } from '../../../helpers/CollisionHelper';
import { Entity } from '../../../models/Entity';

export class ClosestPlayerAtStartPath extends Behaviour {

  targetPlayer: Ship;
  theta: number;
  enteredScreen = false;

  constructor(target: Entity) {
    super('ClosestPlayerAtStartPath', target);
    this.targetPlayer = this.target.$state.getClosestShip(this.target.x, this.target.y);
    let dx: number, dy: number;
    if(this.targetPlayer == null){
      dx = ( C.BOUNDS.maxX / 2 ) - this.target.position.x;
      dy = ( C.BOUNDS.maxY / 2 ) - this.target.position.y;
    } else {
      dx = this.target.position.x - this.targetPlayer.position.x;
      dy = this.target.position.y - this.targetPlayer.position.y;
    }
    this.theta = Math.atan2(dy, dx);
    this.target.angle = this.theta;
  }

  onUpdate(deltaTime): void {
    if(this.targetPlayer != null && this.targetPlayer.invisible == false) {
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
