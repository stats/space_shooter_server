import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';
import { Basic } from '../../models/weapon_system/basic';

export class PrimaryAttackBehaviour extends Behaviour {

  private shield_cooldown:number

  constructor(target) {
    super('shield_recharge', target);

  }

  public onUpdate(deltaTime:number) {
    if(this.target.shield_recharge_cooldown <= this.target.shield_recharge_time && this.target.shield < this.target.max_shields) {
      this.target.shield_recharge_cooldown += deltaTime;
    } else if(this.cooldown > this.target.shield_recharge_time && this.target.shield < this.target.max_shields) {
      this.target.shield_recharge_cooldown = 0;
      this.target.shield += 1;
    }
  }

}
