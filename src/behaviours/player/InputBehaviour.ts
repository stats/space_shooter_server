import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

export class InputBehaviour extends Behaviour {

  horizontal_vector:number = 0;
  vertical_vector:number = 0;

  drag_factor:number = 2;

  constructor(target) {
    super('input', target);
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
    this.target.horizontal_accelleration = Math.min(Math.max(this.target.horizontal_accelleration, -this.target.getSpeed()), this.target.getSpeed());
  }

  private clampVertical() {
    this.target.vertical_accelleration = Math.min(Math.max(this.target.vertical_accelleration, -this.target.getSpeed()), this.target.getSpeed());
  }

  private decellerateHorizontal(deltaTime:number) {
    if(this.target.horizontal_accelleration == 0) return;

    let sign = Math.sign(this.target.horizontal_accelleration);
    if( sign < 0 ) {
      this.target.horizontal_accelleration += Math.min(this.target.getAccelleration()/this.drag_factor * (deltaTime / 1000 ), 0);
    } else {
      this.target.horizontal_accelleration -= Math.max(this.target.getAccelleration()/this.drag_factor * (deltaTime / 1000), 0);
    }
  }

  private decellerateVertical(deltaTime:number) {
    if(this.target.vertical_accelleration == 0) return;

    let sign = Math.sign(this.target.vertical_accelleration);
    if( sign < 0 ) {
      this.target.vertical_accelleration += Math.min(this.target.getAccelleration()/this.drag_factor * (deltaTime / 1000 ), 0);
    } else {
      this.target.vertical_accelleration -= Math.max(this.target.getAccelleration()/this.drag_factor * (deltaTime / 1000), 0);
    }
  }

  public onUpdate(deltaTime:number) {

    if(this.horizontal_vector != 0) {
      this.target.horizontal_accelleration += this.target.getAccelleration() * this.horizontal_vector * (deltaTime/1000);
      if(Math.sign(this.target.horizontal_accelleration) != Math.sign(this.horizontal_vector)) {
        this.decellerateHorizontal(deltaTime);
      }
      this.clampHorizontal();
      this.horizontal_vector = 0;
    } else if( this.horizontal_vector == 0 && this.target.horizontal_accelleration != 0){
      this.decellerateHorizontal(deltaTime);
      this.clampHorizontal();
    }

    if(this.vertical_vector != 0) {
      this.target.vertical_accelleration += this.target.getAccelleration() * this.vertical_vector * (deltaTime/1000);
      if(Math.sign(this.target.vertical_accelleration) != Math.sign(this.vertical_vector)) {
        this.decellerateVertical(deltaTime);
      }
      this.clampVertical();
      this.vertical_vector = 0;
    } else if( this.vertical_vector == 0 && this.target.vertical_accelleration != 0){
      this.decellerateVertical(deltaTime);
      this.clampVertical();
    }
    
    if(this.target.horizontal_accelleration != 0 || this.target.vertical_accelleration != 0){
      this.target.position.x += this.target.horizontal_accelleration * (deltaTime/1000);
      this.target.position.y += this.target.vertical_accelleration * (deltaTime/1000);
      this.target.clampToBounds();
    }
  }
}
