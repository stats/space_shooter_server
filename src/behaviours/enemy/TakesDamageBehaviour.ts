import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

export class TakesDamageBehaviour extends Behaviour {

  constructor(target) {
    super('take_damage', target);
  }

  public onEvent(args: {damage:number}) {
    this.target.health = Math.max(this.target.health - args.damage, 0);
    if(this.target.health <= 0) {
      this.target.handleEvent('destroyed');
    }
  }

}
