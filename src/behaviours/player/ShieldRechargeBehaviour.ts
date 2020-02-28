import { Behaviour } from '../behaviour';

export class ShieldRechargeBehaviour extends Behaviour {

  private shield_cooldown: number

  constructor(target) {
    super('shield_recharge', target);

  }

  public onUpdate(deltaTime: number) {
    if(this.target.shieldsRechargeCooldown < this.target.shieldsRechargeTime && this.target.shields < this.target.maxShields) {
      this.target.shieldsRechargeCooldown += deltaTime;
    } else if(this.target.shieldsRechargeCooldown >= this.target.shieldsRechargeTime && this.target.shields < this.target.maxShields) {
      this.target.shieldsRechargeCooldown = 0;
      this.target.shields += 1;
    }
  }

}
