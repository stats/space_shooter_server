import { Behaviour, C, CollisionHelper, Enemy } from '../../../Internal';

export class StraightLinePath extends Behaviour {

  xDir = 0;
  yDir = 0;

  enteredScreen = false;

  target: Enemy;

  constructor(target: Enemy) {
    super('StraightLinePath', target);
    if(this.target.position.x < C.BOUNDS.minX) {
      this.target.angle = 0;
    }
    if(this.target.position.x > C.BOUNDS.maxX) {
      this.target.angle = Math.PI;
    }
    if(this.target.position.y < C.BOUNDS.minY) {
      this.target.angle = Math.PI / 2;
    }
    if(this.target.position.y > C.BOUNDS.maxY) {
      this.target.angle = (3 * Math.PI) / 2;
    }
  }

  onUpdate(deltaTime): void {
    this.target.position.x += Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
    this.target.position.y += Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;

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
