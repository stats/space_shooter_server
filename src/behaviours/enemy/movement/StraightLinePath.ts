import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class StraightLinePath extends Behaviour {

  xDir:number = 0;
  yDir:number = 0;

  entered_screen:boolean = false;

  constructor(target:any) {
    super('StraightLinePath', target);
    if(this.target.position.x < C.BOUNDS.minX) this.xDir = 1;
    if(this.target.position.x > C.BOUNDS.maxX) this.xDir = -1;
    if(this.target.position.y < C.BOUNDS.minY) this.yDir = 1;
    if(this.target.position.y > C.BOUNDS.maxY) this.yDir = -1;
  }

  onUpdate(deltaTime) {
    if(this.xDir != 0) this.target.position.x += this.target.speed * this.xDir * (deltaTime/1000);
    if(this.yDir != 0) this.target.position.y += this.target.speed * this.yDir * (deltaTime/1000);
    if(!this.entered_screen && CollisionHelper.insideBounds(this.target)){
      this.entered_screen = true;
    }
    if(this.entered_screen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

  remove() {
    this.target.$state.removeEnemy(this.target);
  }
}
