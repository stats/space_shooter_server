import { Behaviour } from '../behaviour';
import { Ship } from '../../models/Ship';

export class InputBehaviour extends Behaviour {

  horizontalVector = 0;
  verticalVector = 0;

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

  public onUpdate(deltaTime: number): void {
    this.target.lastPosition = this.target.position.clone();
    this.target.position.x += this.horizontalVector * this.target.speed * (deltaTime / 1000);
    this.target.position.y += this.verticalVector * this.target.speed * (deltaTime / 1000);
    this.target.clampToBounds();
  }

}
