import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { CollisionHelper } from '../../../helpers/CollisionHelper';
import { Enemy } from '../../../models/Enemy';

export class StraightLinePath extends Behaviour {

  xDir = 0;
  yDir = 0;

  enteredScreen = false;

  target: Enemy;

  constructor(target: Enemy) {
    super('StraightLinePath', target);
    if(this.target.position.x < C.BOUNDS.minX) this.xDir = 1;
    if(this.target.position.x > C.BOUNDS.maxX) this.xDir = -1;
    if(this.target.position.y < C.BOUNDS.minY) this.yDir = 1;
    if(this.target.position.y > C.BOUNDS.maxY) this.yDir = -1;
  }

  onUpdate(deltaTime): void {
    if(this.xDir != 0) this.target.position.x += this.target.speed * this.xDir * (deltaTime/1000);
    if(this.yDir != 0) this.target.position.y += this.target.speed * this.yDir * (deltaTime/1000);
    if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
      this.enteredScreen = true;
    }
    if(this.enteredScreen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

  remove(): void {
    this.target.$state.removeEnemy(this.target);
  }
}
