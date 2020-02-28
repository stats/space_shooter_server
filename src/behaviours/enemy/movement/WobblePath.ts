import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { CollisionHelper } from '../../../helpers/CollisionHelper';
import { Entity } from '../../../models/Entity';

export class WobblePath extends Behaviour {

  xDir = 0;
  yDir = 0;

  wobblePercent = 1;
  wobbleDuration = 3;
  private wobbleTimer = 0;

  enteredScreen = false;

  constructor(target: Entity, args: { wobblePercent: number, wobbleDuration: number}) {
    super('WobblePath', target);
    if(args) {
      this.wobblePercent = args.wobblePercent || 1;
      this.wobbleDuration = args.wobbleDuration || 3;
    }
    if(this.target.position.x < C.BOUNDS.minX) this.xDir = 1;
    if(this.target.position.x > C.BOUNDS.maxX) this.xDir = -1;
    if(this.target.position.y < C.BOUNDS.minY) this.yDir = 1;
    if(this.target.position.y > C.BOUNDS.maxY) this.yDir = -1;
  }

  onUpdate(deltaTime): void {
    if(this.xDir != 0) {
      this.target.position.x += this.target.speed * this.xDir * (deltaTime/1000);
      this.target.position.y += this.target.speed * this.wobblePercent * (deltaTime/1000);
    }
    if(this.yDir != 0) {
       this.target.position.y += this.target.speed * this.yDir * (deltaTime/1000);
       this.target.position.x += this.target.speed * this.wobblePercent * (deltaTime/1000);
    }

    this.wobbleTimer += deltaTime / 1000;
    if(this.wobbleTimer > this.wobbleDuration) {
      this.wobbleTimer = 0;
      this.wobblePercent = -this.wobblePercent;
    }

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
