import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';
import { Ship } from '../../models/ship';
import { Entity } from '../../models/entity';

export class TakesDamageBehaviour extends Behaviour {

  constructor(target) {
    super('take_damage', target);
  }

  public onEvent(args: {damage:number, fired_by?:Entity}) {
    this.target.health = Math.max(this.target.health - args.damage, 0);
    if(this.target.health <= 0) {
      if(args.fired_by && args.fired_by instanceof Ship) {
        let ship = args.fired_by as Ship;
        ship.current_kills += 1;
        ship.kills += 1;
        ship.kill_score += this.target.$state.current_wave;
        //TODO: Check if player leveled up and send a message if so

      }
      this.target.handleEvent('destroyed');
    }
  }

}
