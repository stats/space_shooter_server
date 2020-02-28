import { Behaviour } from '../behaviour';
import { C } from '../../Constants';

export class StraightLineDownPath extends Behaviour {

  startY: number;

  constructor(target: any) {
    super('StraightLineDownPath', target);
    this.startY = this.target.position.y;
  }

  onUpdate(deltaTime) {
    this.target.position.y -= this.target.speed * deltaTime/1000;

    if(Math.abs(this.target.position.y - this.startY) >= this.target.range) {
      this.target.handleEvent('destroyed');
    }
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
