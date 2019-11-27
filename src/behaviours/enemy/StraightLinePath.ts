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
    if(this.xDir != 0) this.target.x += this.target.speed * this.xDir * (deltaTime/1000);
    if(this.yDir != 0) this.target.y += this.target.speed * this.yDir * (deltaTime/1000);
    if(this.target.x < C.BOUNDS.minX - (C.SPAWN_OFFSET * 2) ||
      this.target.x > C.BOUNDS.maxX + (C.SPAWN_OFFSET * 2) ||
      this.target.y < C.BOUNDS.minY - (C.SPAWN_OFFSET * 2) ||
      this.target.y > C.BOUNDS.maxY + (C.SPAWN_OFFSET * 2)) {
      this.remove();
    }
  }

  remove() {
    this.target.$state.removeEnemy(this.target);
  }
}
