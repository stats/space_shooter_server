import { Behaviour, Ship } from '../../Internal';

export class InputBehaviour extends Behaviour {

  horizontalVector = 0;
  verticalVector = 0;

  drag_factor = 2;

  target: Ship;

  constructor(target: Ship) {
    super('input', target);
  }

  public onEvent(args: {horizontal?: number; vertical?: number; primary_attack?: number; special_attack?: number}): void {
    if(args.horizontal) {
      this.horizontalVector = args.horizontal;
    }
    if(args.vertical) {
      this.verticalVector = args.vertical;
    }
    if(args.primary_attack) {
      this.target.handleEvent('primary_attack');
    }
    if(args.special_attack) {
      this.target.handleEvent('special_attack');
    }
  }

  private clampHorizontal(): void {
    this.target.horizontalAccelleration = Math.min(Math.max(this.target.horizontalAccelleration, -this.target.getSpeed()), this.target.getSpeed());
  }

  private clampVertical(): void {
    this.target.verticalAccelleration = Math.min(Math.max(this.target.verticalAccelleration, -this.target.getSpeed()), this.target.getSpeed());
  }

  private decellerateHorizontal(deltaTime: number): void {
    if(this.target.horizontalAccelleration == 0) return;

    const sign = Math.sign(this.target.horizontalAccelleration);
    if( sign < 0 ) {
      this.target.horizontalAccelleration += Math.min(this.target.getAccelleration()/this.drag_factor * (deltaTime / 1000 ), 0);
    } else {
      this.target.horizontalAccelleration -= Math.max(this.target.getAccelleration()/this.drag_factor * (deltaTime / 1000), 0);
    }
  }

  private decellerateVertical(deltaTime: number): void {
    if(this.target.verticalAccelleration == 0) return;

    const sign = Math.sign(this.target.verticalAccelleration);
    if( sign < 0 ) {
      this.target.verticalAccelleration += Math.min(this.target.getAccelleration()/this.drag_factor * (deltaTime / 1000 ), 0);
    } else {
      this.target.verticalAccelleration -= Math.max(this.target.getAccelleration()/this.drag_factor * (deltaTime / 1000), 0);
    }
  }

  public onUpdate(deltaTime: number): void {

    if(this.horizontalVector != 0) {
      this.target.horizontalAccelleration += this.target.getAccelleration() * this.horizontalVector * (deltaTime/1000);
      if(Math.sign(this.target.horizontalAccelleration) != Math.sign(this.horizontalVector)) {
        this.decellerateHorizontal(deltaTime);
      }
      this.clampHorizontal();
      this.horizontalVector = 0;
    } else if( this.horizontalVector == 0 && this.target.horizontalAccelleration != 0){
      //this.decellerateHorizontal(deltaTime);
      //this.clampHorizontal();
    }

    if(this.verticalVector != 0) {
      this.target.verticalAccelleration += this.target.getAccelleration() * this.verticalVector * (deltaTime/1000);
      if(Math.sign(this.target.verticalAccelleration) != Math.sign(this.verticalVector)) {
        this.decellerateVertical(deltaTime);
      }
      this.clampVertical();
      this.verticalVector = 0;
    } else if( this.verticalVector == 0 && this.target.verticalAccelleration != 0){
      //this.decellerateVertical(deltaTime);
      //this.clampVertical();
    }

    if(this.target.horizontalAccelleration != 0 || this.target.verticalAccelleration != 0){
      this.target.position.x += this.target.horizontalAccelleration * (deltaTime/1000);
      this.target.position.y += this.target.verticalAccelleration * (deltaTime/1000);
      this.target.clampToBounds();
    }
  }
}
