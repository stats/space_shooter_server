import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class StraightLineUpPath extends Behaviour {

  start_y:number;

  constructor(target:any, ) {
    super('StraightLineUpPath', target);
  }

  onUpdate(deltaTime) {
    this.target.y += this.target.speed * deltaTime;

    if(this.target.y - this.start_y >= this.target.range) this.target.Destroy();
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
