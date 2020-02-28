import { Behaviour } from '../behaviour';
import { C } from '../../Constants';

export class StraightLineUpPath extends Behaviour {

  startY: number;

  constructor(target: any) {
    super('StraightLineUpPath', target);
    this.startY = this.target.position.y;
  }

  onUpdate(deltaTime) {
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
