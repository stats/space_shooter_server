import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { Ship } from '../../models/ship';

export class TargetPlayerStartPath extends Behaviour {

  theta:number = 0;

  constructor(target:any) {
    super('TargetPlayerStartPath', target);
    let ship:Ship = this.target.$state.getClosestShip(this.target.x, this.target.y);
    let dx = this.target.position.x - ship.position.x;
    let dy = this.target.position.y - ship.position.y;
    this.theta = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime) {
    this.target.position.x += -Math.cos(this.theta) * this.target.speed * deltaTime/1000;
    this.target.position.y += -Math.sin(this.theta) * this.target.speed * deltaTime/1000;

    if(CollisionHelper.outsideBounds(this.target)) this.target.handleEvent('destroyed');
  }
}
