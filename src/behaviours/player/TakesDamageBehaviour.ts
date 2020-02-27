import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { Bounds } from '../../helpers/Bounds';

export class TakesDamageBehaviour extends Behaviour {

  constructor(target) {
    super('take_damage', target);
  }

  public onEvent(args: {damage:number}) {    
    this.target.shields = Math.max(this.target.shields - args.damage, 0);
    if(this.target.shields <= 0) {
      this.target.handleEvent('destroyed');
    }
  }

}
