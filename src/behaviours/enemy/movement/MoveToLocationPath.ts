import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { Position } from '../../../models/Position';
import { CollisionHelper } from '../../../helpers/CollisionHelper';
import { Entity } from '../../../models/Entity';
import { Enemy } from '../../../models/Enemy';

export class MoveToLocationPath extends Behaviour {

  moveTo: Position;
  moveComplete = false;

  enteredScreen = false;

  target: Enemy;

  constructor(target: Enemy, moveTo?: Position, onComplete?: any) {
    super('MoveToLocation', target, onComplete);
    this.moveTo = moveTo;
    if(this.moveTo == null) {
      this.moveTo = new Position( C.RANDOM_X_ON_SCREEN,  C.RANDOM_Y_ON_SCREEN)
    }

    const dx = this.moveTo.x - this.target.position.x;
    const dy = this.moveTo.y - this.target.position.y;

    this.target.angle = Math.atan2(dy, dx);
    this.target.disableBehaviour("primary");
  }

  onUpdate(deltaTime): void {
    if(this.moveComplete) return;

    if(this.target.position.distanceTo(this.moveTo) <= this.target.speed * deltaTime/1000) {
      this.target.position.x = this.moveTo.x;
      this.target.position.y = this.moveTo.y;
      this.target.enableBehaviour("primary");
      this.moveComplete = true;
    } else {
      this.target.position.x += Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
      this.target.position.y += Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;

      if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
        this.enteredScreen = true;
      }
      if(this.enteredScreen && CollisionHelper.outsideBounds(this.target) || CollisionHelper.tooFar(this.target)) {
        this.target.handleEvent('destroyed');
      }
    }
  }
}
