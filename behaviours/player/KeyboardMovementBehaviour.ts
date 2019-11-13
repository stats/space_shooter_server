import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '.././helpers/Bounds';

export class KeyboardMovementBehaviour extends Behaviour {

  max_speed:number;

  acceleration:number;

  acceleration_x:number;
  acceleration_y:number;

  boundaries:Bounds;

  constructor(target, bounds:Boundaries) {
    super('WASDMovement', target);
    this.bounds = C.BOUNDS;

  }

  public handleEvent(args: {up:boolean, down:boolean, left:boolean, right:boolean}) {
    if(args.up) this.target.incrementY();
    if(args.down) this.target.deincrementY();
    if(args.left) this.target.deincrementX();
    if(args.right) this.target.incrementX();
  }

  public handleTick(deltaTime:number) {
    this.x += this.acceleration_x * deltaTime;
    this.y += this.acceleration_y * deltaTime;
    if(this.x < this.bounds.min_x) this.x = this.bounds.min_x;
    if(this.x > this.bounds.max_x) this.x = this.bounds.max_x;
    if(this.y < this.bounds.min_y) this.y = this.bounds.min_y;
    if(this.y > this.bounds.max_y) this.y = this.bounds.max_y;
  }

  private incrementX() {
    this.acceleration_x += this.acceleration;
    this.acceleration = this.clampAcceleration();
  }

  private deincrementX() {
    this.acceleration_x -= this.acceleration;
    this.acceleration = this.clampAcceleration();
  }

  private incrementY() {
    this.acceleration_y += this.acceleration;
    this.acceleration = this.clampAcceleration();
  }

  private deincrementY() {
    this.acceleration_y -= this.acceleration;
    this.acceleration = this.clampAcceleration();
  }

  private clampAcceleration() {
    this.acceleration = Math.min(Math.max(this.acceleration, -this.max_speed), this.max_speed);
  }

}
