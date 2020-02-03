import { Behaviour } from '../../behaviour';
import { C } from '../../../constants';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class WobblePath extends Behaviour {

  xDir:number = 0;
  yDir:number = 0;

  wobble_percent:number = 1;
  wobble_duration:number = 3;
  private wobble_timer:number = 0;

  entered_screen:boolean = false;

  constructor(target:any, args?:{wobble_percent:number, wobble_duration:number}) {
    super('WobblePath', target);
    if(args) {
      this.wobble_percent = args.wobble_percent || 1;
      this.wobble_duration = args.wobble_duration || 3;
    }
    if(this.target.position.x < C.BOUNDS.minX) this.xDir = 1;
    if(this.target.position.x > C.BOUNDS.maxX) this.xDir = -1;
    if(this.target.position.y < C.BOUNDS.minY) this.yDir = 1;
    if(this.target.position.y > C.BOUNDS.maxY) this.yDir = -1;
  }

  onUpdate(deltaTime) {
    if(this.xDir != 0) {
      this.target.position.x += this.target.speed * this.xDir * (deltaTime/1000);
      this.target.position.y += this.target.speed * this.wobble_percent * (deltaTime/1000);
    }
    if(this.yDir != 0) {
       this.target.position.y += this.target.speed * this.yDir * (deltaTime/1000);
       this.target.position.x += this.target.speed * this.wobble_percent * (deltaTime/1000);
    }

    this.wobble_timer += deltaTime / 1000;
    if(this.wobble_timer > this.wobble_duration) {
      this.wobble_timer = 0;
      this.wobble_percent = -this.wobble_percent;
    }

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
