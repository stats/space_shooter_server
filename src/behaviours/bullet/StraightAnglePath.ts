import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { Position } from '../../models/Position';

export class StraightAnglePath extends Behaviour {

  start:Position;
  angle:number;

  constructor(target:any, args: {angle:number}) {
    super('StraightAnglePath', target);
    this.start = new Position(this.target.position.x, this.target.position.y);
    this.angle = args.angle;
  }

  onUpdate(deltaTime) {
    this.target.position.x += Math.cos(this.angle) * this.target.speed * deltaTime/1000;
    this.target.position.y += Math.sin(this.angle) * this.target.speed * deltaTime/1000;

    if(this.start.distanceTo(this.target.position) > this.target.range) this.target.handleEvent('destroyed');
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
