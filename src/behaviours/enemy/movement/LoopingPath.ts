import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class LoopingPath extends Behaviour {

  dir = 0;

  theta = 0;

  enteredScreen = false;

  constructor(target: any) {
    super('LoopingPath', target);

    const dx = 800 - this.target.position.x;
    const dy = 450 - this.target.position.y;

    this.theta = Math.atan2(dy,dx);
    this.target.angle = this.theta;
    this.dir = Math.random() < 0.5 ? 1 : -1;
  }

  onUpdate(deltaTime) {

    this.theta += this.dir * Math.PI / 20 * (deltaTime/1000);
    this.target.angle = this.theta;

    this.target.position.x += this.target.speed * Math.cos(this.theta) * (deltaTime/1000);
    this.target.position.y += this.target.speed * Math.sin(this.theta) * (deltaTime/1000);

    if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
      this.enteredScreen = true;
    }
    if(this.enteredScreen && CollisionHelper.outsideBounds(this.target) || CollisionHelper.tooFar(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

  remove() {
    this.target.$state.removeEnemy(this.target);
  }
}
