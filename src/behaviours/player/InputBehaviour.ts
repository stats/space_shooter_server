import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

export class InputBehaviour extends Behaviour {

  bounds:Bounds;

  horizontal_vector:number;
  vertical_vector:number;

  constructor(target) {
    super('input', target);
    this.bounds = C.BOUNDS;
  }

  public onEvent(args: {horizontal?:number, vertical?:number, primary_attack?:number, special_attack?:number}) {
    if(args.horizontal) {
      this.horizontal_vector = args.horizontal;
    }
    if(args.vertical) {
      this.vertical_vector = args.vertical;
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
    if(this.horizontal_vector != 0) {
      this.target.horizontal_acceleration += this.target.accelleration * this.horizontal_vector * (deltaTime/1000);
      this.clampHorizontal();
      this.horizontal_vector = 0;
    }
    if(this.vertical_vector != 0) {
      this.target.vertical_acceleration += this.target.accelleration * this.horizontal_vector * (deltaTime/1000);
      this.clampVertical();
      this.vertical_vector = 0;
    }
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
