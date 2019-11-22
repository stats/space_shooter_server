import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

export class KeyboardMovementBehaviour extends Behaviour {


  bounds:Bounds;

  horizontal:number = 0;
  vertical:number = 0;


  constructor(target) {
    super('Input', target);
    this.bounds = C.BOUNDS;

  }

  public onEvent(args: {horizontal?:number, vertical?:number, primary_attack?:number, secondary_attack?:number}) {
    if(args.horizontal) {
      this.horizontal += Math.min(Math.max(this.target.accelleration * args.horizontal, this.target.speed), -this.target.speed);
    }
    if(args.vertical) {
      this.vertical += Math.min(Math.max(this.target.accelleration * args.vertical, this.target.speed), -this.target.speed);
    }
    if(args.primary_attack) {
      this.target.
    }
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
