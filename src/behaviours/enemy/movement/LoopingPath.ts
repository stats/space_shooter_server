import { Behaviour, CollisionHelper, Enemy } from '../../../Internal';

export class LoopingPath extends Behaviour {

  dir = 0;

  enteredScreen = false;

  target: Enemy;

  constructor(target: Enemy) {
    super('LoopingPath', target);

    const dx = 800 - this.target.position.x;
    const dy = 450 - this.target.position.y;

    this.target.angle = Math.atan2(dy,dx);
    this.dir = Math.random() < 0.5 ? 1 : -1;
  }

  onUpdate(deltaTime): void {

    this.target.angle += this.dir * Math.PI / 20 * (deltaTime/1000);
    this.target.angle = this.target.angle;

    this.target.position.x += this.target.speed * Math.cos(this.target.angle) * (deltaTime/1000);
    this.target.position.y += this.target.speed * Math.sin(this.target.angle) * (deltaTime/1000);

    if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
      this.enteredScreen = true;
    }
    if(this.enteredScreen && CollisionHelper.outsideBounds(this.target) || CollisionHelper.tooFar(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

  remove(): void {
    this.target.$state.removeEnemy(this.target);
  }
}
