import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class StraightLineUpPath extends Behaviour {

  start_y:number;

  constructor(target:any) {
    super('StraightLineUpPath', target);
    this.start_y = this.target.y;
  }

  onUpdate(deltaTime) {
    this.target.y += this.target.speed * deltaTime;

    if(this.target.y - this.start_y >= this.target.range) this.target.handleEvent('destroyed');
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
