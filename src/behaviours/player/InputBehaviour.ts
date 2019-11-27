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
    if(args.horizontal) {
      this.horizontal += this.target.accelleration * args.horizontal;
      this.clampHorizontal();
    }
    if(args.vertical) {
      this.vertical += this.target.accelleration * args.vertical
      this.clampVertical();
    }
    if(args.primary_attack) {
      this.target.handleEvent('primary_attack');
    }
    if(args.special_attack) {
      this.target.handleEvent('special_attack');
    }
  }

  private clampHorizontal() {
    this.horizontal = Math.min(Math.max(this.horizontal, -this.target.speed), this.target.speed);
  }

  private clampVertical() {
    this.vertical = Math.min(Math.max(this.vertical, -this.target.speed), this.target.speed);
  }

  public onUpdate(deltaTime:number) {
    if(this.horizontal != 0 || this.vertical != 0){
      this.target.x += this.horizontal * (deltaTime/1000);
      this.target.y += this.vertical * (deltaTime/1000);
      if(this.target.x < this.bounds.minX) this.target.x = this.bounds.minX;
      if(this.target.x > this.bounds.maxX) this.target.x = this.bounds.maxX;
      if(this.target.y < this.bounds.minY) this.target.y = this.bounds.minY;
      if(this.target.y > this.bounds.maxY) this.target.y = this.bounds.maxY;
    }
  }
}
