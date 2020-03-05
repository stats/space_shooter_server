import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { Position } from '../../../models/Position';
import { CollisionHelper } from '../../../helpers/CollisionHelper';
import { Enemy } from '../../../models/Enemy';

export class MoveToLocationThenRotatePath extends Behaviour {

  moveTo: Position;
  moveComplete = false;

  rotationDirection = 1;

  enteredScreen = false;

  target: Enemy;

  constructor(target: Enemy, args: { moveTo: Position }) {
    super('MoveToLocationThenRotate', target);
    this.moveTo = args.moveTo || Position.randomOnScreen();
    if(this.moveTo == null) {
      this.moveTo = new Position( C.RANDOM_X_ON_SCREEN,  C.RANDOM_Y_ON_SCREEN)
    }

    const dx = this.moveTo.x - this.target.position.x;
    const dy = this.moveTo.y - this.target.position.y;

    this.target.angle = Math.atan2(dy, dx);
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
    this.target.disableBehaviour("primary");
  }

  onUpdate(deltaTime): void {
    if(this.moveComplete) {
      this.handleRotation(deltaTime);
    } else {
      this.handleMovement(deltaTime);
    }
  }

  private handleRotation(deltaTime): void {
    this.target.angle += this.rotationDirection * 0.5 * deltaTime/1000;
  }

  private handleMovement(deltaTime): void {
    if(this.target.position.distanceTo(this.moveTo) <= this.target.speed * deltaTime/1000) {
      this.target.position.x = this.moveTo.x;
      this.target.position.y = this.moveTo.y;
      this.moveComplete = true;
      this.target.enableBehaviour("primary");
    } else {
      this.target.position.x += Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
      this.target.position.y += Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;

      if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
        this.enteredScreen = true;
      }
      if(this.enteredScreen && CollisionHelper.outsideBounds(this.target)) {
        this.target.handleEvent('destroyed');
      }
    }
  }
}
