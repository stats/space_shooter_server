import { Behaviour } from '../../behaviour';
import { CollisionHelper } from '../../../helpers/CollisionHelper';
import { Ship } from '../../../models/Ship';
import { Enemy } from '../../../models/Enemy';

export class TargetPlayerStartPath extends Behaviour {

  enteredScreen = false;

  target: Enemy;

  constructor(target: Enemy) {
    super('TargetPlayerStartPath', target);
    const ship: Ship = this.target.$state.getClosestShip(this.target.position.x, this.target.position.y);
    if(ship == null){
      console.log("Error: Ship is null in TargetPlayerStartPath");
      this.target.handleEvent('destroyed');
      return;
    }
    const dx = this.target.position.x - ship.position.x;
    const dy = this.target.position.y - ship.position.y;
    this.target.angle = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime): void {
    this.target.position.x += -Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
    this.target.position.y += -Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;

    if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
      this.enteredScreen = true;
    }
    if(this.enteredScreen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }
}
