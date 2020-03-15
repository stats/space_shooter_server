import { Behaviour } from '../behaviour';
import { Ship } from '../../models/Ship';


export class ShieldRechargeBehaviour extends Behaviour {

  private shield_cooldown: number;

  target: Ship;

  constructor(target: Ship) {
    super('shield_recharge', target);

  }

  public onUpdate(deltaTime: number): void {
    if(this.target.shieldRechargeTime < this.target.shieldRechargeCooldown && this.target.shield < this.target.maxShield) {
      this.target.shieldRechargeTime += deltaTime;
    } else if(this.target.shieldRechargeTime >= this.target.shieldRechargeCooldown && this.target.shield < this.target.maxShield) {
      this.target.shieldRechargeTime = 0;
      this.target.shield += 1;
    }
  }

}
