import { Behaviour } from '../behaviour';
import { C } from '../../Constants';

export class StraightLineUpPath extends Behaviour {

  start_y:number;

  constructor(target:any) {
    super('StraightLineUpPath', target);
    this.start_y = this.target.position.y;
  }

  onUpdate(deltaTime) {
    this.target.position.y += this.target.speed * deltaTime/1000;

    if(this.target.position.y - this.start_y >= this.target.range) {
      if(this.target.blast_radius != 0) {
        this.target.handleEvent('explode');
      }
      this.target.handleEvent('destroyed');
    }
    /** TODO: Determine if we want to remove bullets when offscreen **/
  }
}
