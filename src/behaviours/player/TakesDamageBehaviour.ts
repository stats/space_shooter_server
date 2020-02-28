import { Behaviour } from '../behaviour';
import { Ship } from '../../models/Ship';

export class TakesDamageBehaviour extends Behaviour {

  target: Ship;

  constructor(target: Ship) {
    super('take_damage', target);
  }

  public onEvent(args: {damage: number}): void {
    this.target.shields = Math.max(this.target.shields - args.damage, 0);
    if(this.target.shields <= 0) {
      this.target.handleEvent('destroyed');
    }
  }

}
