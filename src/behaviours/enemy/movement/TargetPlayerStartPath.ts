import { Behaviour } from '../../behaviour';
import { CollisionHelper } from '../../../helpers/CollisionHelper';
import { Ship } from '../../../models/Ship';
import { Entity } from '../../../models/Entity';

export class TargetPlayerStartPath extends Behaviour {

  theta = 0;
  enteredScreen = false;

  constructor(target: Entity) {
    super('TargetPlayerStartPath', target);
    const ship: Ship = this.target.$state.getClosestShip(this.target.x, this.target.y);
    if(ship == null){
      console.log("Error: Ship is null in TargetPlayerStartPath");
      this.target.handleEvent('destroyed');
      return;
    }
    const dx = this.target.position.x - ship.position.x;
    const dy = this.target.position.y - ship.position.y;
    this.theta = Math.atan2(dy, dx);
    this.target.angle = this.theta;
  }

  onUpdate(deltaTime): void {
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
