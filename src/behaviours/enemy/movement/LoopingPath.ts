import { Behaviour } from '../../behaviour';
import { C } from '../../../constants';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class StraightLinePath extends Behaviour {

  xDir:number = 0;
  yDir:number = 0;

  radius:number = 500;
  start_radius:number = 500;
  origin_x:number = 0;
  origin_y:number = 0;
  theta:number = 0;
  descending:boolean = true;

  entered_screen:boolean = false;

  constructor(target:any, radius:number = 500) {
    super('StraightLinePath', target);
    this.radius = radius;
    this.start_radius = radius;

    /** TODO: MAY WANT TO ALWAYS LERP THE POINT TOWARDS THE CENTER **/
    if(this.target.position.x < C.BOUNDS.minX) {
      this.xDir = 1;
      this.origin_x = this.target.position.x + this.radius;
      this.origin_y = this.target.position.y;
    }
    if(this.target.position.x > C.BOUNDS.maxX) {
      this.xDir = -1;
      this.origin_x = this.target.position.x - this.radius;
      this.origin_y = this.target.position.y
    }
    if(this.target.position.y < C.BOUNDS.minY){
      this.yDir = 1;
      this.origin_x = this.target.position.x;
      this.origin_y = this.target.position.y + this.radius
    }
    if(this.target.position.y > C.BOUNDS.maxY) {
      this.yDir = -1;
      this.origin_x = this.target.position.x;
      this.origin_y = this.target.position.y - this.radius
    }
    this.theta = 0;
  }

  onUpdate(deltaTime) {
    this.target.position.x = this.origin_x + cos(this.theta) * this.radius;
    this.target.position.y = this.origin_y + sin(this.theta) * this.radius;

    /** TODO: Change these numbers to make a good loop **/
    theta += this.target.speed * (deltaTime/1000);
    if(this.descending) {
      this.radius -= this.speed * (deltaTime/1000);
      if(this.radius < this.start_radius / 2) {
        this.descending = false;
      }
    } else {
      this.radius += this.speed * (deltaTime/1000);
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
