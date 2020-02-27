import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { Position } from '../../../models/Position';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class MoveToLocationPath extends Behaviour {

  moveTo:Position;
  theta:number;
  moveComplete:boolean = false;

  entered_screen:boolean = false;

  constructor(target:any, args:{moveTo:Position}) {
    super('MoveToLocation', target);
    this.moveTo = args.moveTo;
    if(this.moveTo == null) {
      this.moveTo = new Position( C.RANDOM_X_ON_SCREEN,  C.RANDOM_Y_ON_SCREEN)
    }

    let dx = this.moveTo.x - this.target.position.x;
    let dy = this.moveTo.y - this.target.position.y;

    this.theta = Math.atan2(dy, dx);
    this.target.angle = this.theta;
  }

  onUpdate(deltaTime) {
    if(this.moveComplete) return;

    if(this.target.position.distanceTo(this.moveTo) <= this.target.speed * detaTime/1000) {
      this.target.position.x = this.moveTo.x;
      this.target.position.y = this.moveTo.y;
      this.moveComplete = true;
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
