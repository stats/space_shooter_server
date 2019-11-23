import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

export class InputBehaviour extends Behaviour {

  bounds:Bounds;

  horizontal:number = 0;
  vertical:number = 0;

  constructor(target) {
    super('input', target);
    this.bounds = C.BOUNDS;
  }

  public onEvent(args: {horizontal?:number, vertical?:number, primary_attack?:number, special_attack?:number}) {
    console.log("target", this.target.accelleration, this.target.speed);
    if(args.horizontal) {
      this.horizontal += Math.min(Math.max(this.target.accelleration * args.horizontal, this.target.speed), -this.target.speed);
    }
    if(args.vertical) {
      this.vertical += Math.min(Math.max(this.target.accelleration * args.vertical, this.target.speed), -this.target.speed);
    }
    if(args.primary_attack) {
      this.target.handleEvent('primary_attack');
    }
    if(args.special_attack) {
      this.target.handleEvent('special_attack');
    }
    console.log("Handling Input", args, this.vertical, this.horizontal);
  }

  public onUpdate(deltaTime:number) {
    this.target.x += this.horizontal * deltaTime;
    this.target.y += this.vertical * deltaTime;
    if(this.target.x < this.bounds.minX) this.target.x = this.bounds.minX;
    if(this.target.x > this.bounds.maxX) this.target.x = this.bounds.maxX;
    if(this.target.y < this.bounds.minY) this.target.y = this.bounds.minY;
    if(this.target.y > this.bounds.maxY) this.target.y = this.bounds.maxY;
  }
}
