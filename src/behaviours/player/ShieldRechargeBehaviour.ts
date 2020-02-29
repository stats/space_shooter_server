import { Behaviour } from '../behaviour';
import { Entity } from '../../models/Entity';
import { Ship } from '../../models/Ship';


export class ShieldRechargeBehaviour extends Behaviour {

  private shield_cooldown: number;

  target:Ship;

  constructor(target: Ship) {
    super('shield_recharge', target);

  }

  public onUpdate(deltaTime: number): void {
    if(this.target.shieldsRechargeCooldown < this.target.shieldsRechargeTime && this.target.shields < this.target.maxShields) {
      this.target.shieldsRechargeCooldown += deltaTime;
    } else if(this.target.shieldsRechargeCooldown >= this.target.shieldsRechargeTime && this.target.shields < this.target.maxShields) {
      this.target.shieldsRechargeCooldown = 0;
      this.target.shields += 1;
    }
  }

}
