import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class StraightLinePath extends Behavious {

  xDir:number = 0;
  yDir:number = 0;

  constructor(target:any) {
    this.target = target;
    this.event_type = "StraightLinePath";
    if(this.target.x < C.BOUNDS.minX) xDir = 1;
    if(this.target.x > C.BOUNDS.maxX) xDir = -1;
    if(this.target.y < C.BOUNDS.minY) yDir = 1;
    if(this.target.y > C.BOUNDS.maxY) yDir = -1;
  }

  onUpdate(deltaTime) {
    if(this.xDir) this.target.x += this.target.speed * this.xDir * deltaTime;
    if(this.yDir) this.target.y += this.target.speed * this.yDir * deltaTime;
  }
}
