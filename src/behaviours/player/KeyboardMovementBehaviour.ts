import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

export class KeyboardMovementBehaviour extends Behaviour {

  max_speed:number;

  acceleration:number;

  acceleration_x:number = 0;
  acceleration_y:number = 0;

  bounds:Bounds;

  constructor(target) {
    super('WASDMovement', target);
    this.bounds = C.BOUNDS;

  }

  public handleEvent(args: {up:boolean, down:boolean, left:boolean, right:boolean}) {
    if(args.up) this.target.incrementY();
    if(args.down) this.target.deincrementY();
    if(args.left) this.target.deincrementX();
    if(args.right) this.target.incrementX();
  }

  public onUpdate(deltaTime:number) {
    this.target.x += this.acceleration_x * deltaTime;
    this.target.y += this.acceleration_y * deltaTime;
    if(this.target.x < this.bounds.minX) this.target.x = this.bounds.minX;
    if(this.target.x > this.bounds.maxX) this.target.x = this.bounds.maxX;
    if(this.target.y < this.bounds.minY) this.target.y = this.bounds.minY;
    if(this.target.y > this.bounds.maxY) this.target.y = this.bounds.maxY;
  }

  private incrementX() {
    this.acceleration_x += this.target.acceleration;
    this.clampAcceleration();
  }

  private deincrementX() {
    this.acceleration_x -= this.target.acceleration;
    this.clampAcceleration();
  }

  private incrementY() {
    this.acceleration_y += this.target.acceleration;
    this.clampAcceleration();
  }

  private deincrementY() {
    this.acceleration_y -= this.target.acceleration;
    this.clampAcceleration();
  }

  private clampAcceleration() {
    this.acceleration = Math.min(Math.max(this.target.acceleration, -this.target.speed), this.target.speed);
  }

}
