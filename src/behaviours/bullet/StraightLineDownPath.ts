import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class StraightLineDownPath extends Behaviour {

  start_y:number;

  constructor(target:any) {
    super('StraightLineDownPath', target);
    this.start_y = this.target.position.y;
  }

  onUpdate(deltaTime) {
    this.target.position.y -= this.target.speed * deltaTime/1000;

    if(Math.abs(this.target.position.y - this.start_y) >= this.target.range) {
      this.target.handleEvent('destroyed');
    }
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
