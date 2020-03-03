import { Behaviour } from '../behaviour';
import { Position } from '../../models/Position';
import { Bullet } from '../../models/Bullet';

export class StraightAnglePath extends Behaviour {

  start: Position;

  target: Bullet;

  constructor(target: Bullet, args: { angle: number}) {
    super('StraightAnglePath', target);
    this.start = new Position(this.target.position.x, this.target.position.y);
    this.target.angle = args.angle;
  }

  onUpdate(deltaTime): void {
    this.target.position.x += Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
    this.target.position.y += Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;

    if(this.start.distanceTo(this.target.position) > this.target.range) this.target.handleEvent('destroyed');
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
