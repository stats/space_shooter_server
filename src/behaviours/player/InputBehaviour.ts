import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

export class InputBehaviour extends Behaviour {

  bounds:Bounds;

  constructor(target) {
    super('input', target);
    this.bounds = C.BOUNDS;
  }

  public onEvent(args: {horizontal?:number, vertical?:number, primary_attack?:number, special_attack?:number}) {
    if(args.horizontal) {
      this.target.horizontal_accelleration += this.target.accelleration * args.horizontal;
      this.clampHorizontal();
    }
    if(args.vertical) {
      this.target.vertical_accelleration += this.target.accelleration * args.vertical
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
    this.target.horizontal_accelleration = Math.min(Math.max(this.target.horizontal_accelleration, -this.target.speed), this.target.speed);
  }

  private clampVertical() {
    this.target.vertical_accelleration = Math.min(Math.max(this.target.vertical_accelleration, -this.target.speed), this.target.speed);
  }

  public onUpdate(deltaTime:number) {
    if(this.target.horizontal_accelleration != 0 || this.target.vertical_accelleration != 0){
      this.target.x += this.target.horizontal_accelleration * (deltaTime/1000);
      this.target.y += this.target.vertical_accelleration * (deltaTime/1000);
      if(this.target.x < this.bounds.minX) this.target.x = this.bounds.minX;
      if(this.target.x > this.bounds.maxX) this.target.x = this.bounds.maxX;
      if(this.target.y < this.bounds.minY) this.target.y = this.bounds.minY;
      if(this.target.y > this.bounds.maxY) this.target.y = this.bounds.maxY;
    }
  }
}
