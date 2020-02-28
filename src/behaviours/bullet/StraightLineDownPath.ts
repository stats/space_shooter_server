import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';

export class StraightLineDownPath extends Behaviour {

  startY: number;
  target: Bullet;

  constructor(target: Bullet) {
    super('StraightLineDownPath', target);
    this.startY = this.target.position.y;
  }

  onUpdate(deltaTime): void {
    this.target.position.y -= this.target.speed * deltaTime/1000;

    if(Math.abs(this.target.position.y - this.startY) >= this.target.range) {
      this.target.handleEvent('destroyed');
    }
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
