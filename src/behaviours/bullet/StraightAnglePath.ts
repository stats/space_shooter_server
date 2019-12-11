import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Position } from '../../models/position';

export class StraightAnglePath extends Behaviour {

  start:Position;

  constructor(target:any) {
    super('StraightAnglePath', target);
    this.start = new Position(this.target.position.x, this.target.position.y);
  }

  onUpdate(deltaTime) {
    this.target.position.x += Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
    this.target.position.y += Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;

    if(this.start.distanceTo(this.target.position) > this.target.range) this.target.handleEvent('destroyed');
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
