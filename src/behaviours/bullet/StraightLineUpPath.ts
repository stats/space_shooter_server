import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';

export class StraightLineUpPath extends Behaviour {

  startY: number;
  target: Bullet;

  constructor(target: Bullet) {
    super('StraightLineUpPath', target);
    this.startY = this.target.position.y;
  }

  onUpdate(deltaTime): void {
    this.target.position.y += this.target.speed * deltaTime/1000;

    if(this.target.position.y - this.startY >= this.target.range) {
      if(this.target.blastRadius != 0) {
        this.target.handleEvent('explode');
      }
      this.target.handleEvent('destroyed');
    }
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
