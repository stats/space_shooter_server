import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class LoopingPath extends Behaviour {

  dir:number = 0;

  theta:number = 0;

  entered_screen:boolean = false;

  constructor(target:any) {
    super('LoopingPath', target);

    let dx = 800 - this.target.position.x;
    let dy = 450 - this.target.position.y;

    this.theta = Math.atan2(dy,dx);
    this.target.angle = this.theta;
    this.dir = Math.random() < 0.5 ? 1 : -1;
  }

  onUpdate(deltaTime) {

    this.theta += this.dir * Math.PI / 20 * (deltaTime/1000);
    this.target.angle = this.theta;

    this.target.position.x += this.target.speed * Math.cos(this.theta) * (deltaTime/1000);
    this.target.position.y += this.target.speed * Math.sin(this.theta) * (deltaTime/1000);

    if(!this.entered_screen && CollisionHelper.insideBounds(this.target)){
      this.entered_screen = true;
    }
    if(this.entered_screen && CollisionHelper.outsideBounds(this.target) || CollisionHelper.tooFar(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

  remove() {
    this.target.$state.removeEnemy(this.target);
  }
}
