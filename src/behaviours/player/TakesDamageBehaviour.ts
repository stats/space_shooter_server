import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

export class KeyboardMovementBehaviour extends Behaviour {

  constructor(target) {
    super('take_damage', target);
  }

  public onEvent(args: {damage:number}) {
    this.target.shields = Math.max(this.target.shields - args.damage, 0);
    if(this.target.shields <= 0) {
      this.target.handleEvent('destroyed');
    }
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
