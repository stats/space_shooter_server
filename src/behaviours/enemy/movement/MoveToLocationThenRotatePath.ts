import { Behaviour } from '../../behaviour';
import { C } from '../../../constants';
import { Position } from '../../../models/position';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class MoveToLocationThenRotatePath extends Behaviour {

  moveTo:Position;
  theta:number;
  moveComplete:boolean = false;

  rotationDirection:Number = 1;

  entered_screen:boolean = false;

  constructor(target:any, args:{moveTo:Position}) {
    super('MoveToLocationThenRotate', target);
    this.moveTo = args.moveTo || Position.randomOnScreen();
    if(this.moveTo == null) {
      this.moveTo = new Position( C.RANDOM_X_ON_SCREEN,  C.RANDOM_Y_ON_SCREEN)
    }

    let dx = this.moveTo.x - this.target.position.x;
    let dy = this.moveTo.y - this.target.position.y;

    this.theta = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime) {
    if(this.moveComplete) {
      this.handleRotation(deltaTime);
    } else {
      this.handleMovement(deltaTime);
    }
  }

  private handleRotation(deltaTime) {
    if(this.target.angle > 2 * Math.PI) {
      this.rotationDirection = -1;
    }
    if(this.target.angle < Math.PI) {
      this.rotationDirection = 1;
    }

    this.target.angle += this.rotationDirection * 0.1 * deltaTime/1000;
  }

  private handleMovement(deltaTime) {
    if(this.target.position.distanceTo(this.moveTo) <= this.target.speed * detaTime/1000) {
      this.target.position.x = this.moveTo.x;
      this.target.position.y = this.moveTo.y;
      this.moveComplete = true;
      this.target.override_angle = true;
      this.target.angle = this.theta;
    } else {
      this.target.position.x += Math.cos(this.theta) * this.target.speed * deltaTime/1000;
      this.target.position.y += Math.sin(this.theta) * this.target.speed * deltaTime/1000;

      if(!this.entered_screen && CollisionHelper.insideBounds(this.target)){
        this.entered_screen = true;
      }
      if(this.entered_screen && CollisionHelper.outsideBounds(this.target)) {
        this.target.handleEvent('destroyed');
      }
    }
  }
}
