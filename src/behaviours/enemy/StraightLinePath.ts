import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class StraightLinePath extends Behaviour {

  xDir:number = 0;
  yDir:number = 0;

  constructor(target:any) {
    super('StraightLinePath', target);
    if(this.target.x < C.BOUNDS.minX) this.xDir = 1;
    if(this.target.x > C.BOUNDS.maxX) this.xDir = -1;
    if(this.target.y < C.BOUNDS.minY) this.yDir = 1;
    if(this.target.y > C.BOUNDS.maxY) this.yDir = -1;
  }

  onUpdate(deltaTime) {
    if(this.xDir) this.target.x += this.target.speed * this.xDir * deltaTime;
    if(this.yDir) this.target.y += this.target.speed * this.yDir * deltaTime;
  }
}
