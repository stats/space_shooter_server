import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';
import { Basic } from '../../models/weapon_system/basic';

export class ShieldRechargeBehaviour extends Behaviour {

  private shield_cooldown:number

  constructor(target) {
    super('shield_recharge', target);

  }

  public onUpdate(deltaTime:number) {
    if(this.target.shields_recharge_cooldown <= this.target.shields_recharge_time && this.target.shields < this.target.max_shields) {
      this.target.shields_recharge_cooldown += deltaTime;
    } else if(this.target.shields_recharge_cooldown > this.target.shields_recharge_time && this.target.shields < this.target.max_shields) {
      this.target.shields_recharge_cooldown = 0;
      this.target.shields += 1;
    }
  }

}
