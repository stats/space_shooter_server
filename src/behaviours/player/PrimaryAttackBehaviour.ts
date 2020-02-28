import { Behaviour } from '../behaviour';
import { PRIMARY } from '../../Primary';
import { Ship } from '../../models/Ship';
import { Primary } from '../../models/primary/Primary';


export class PrimaryAttackBehaviour extends Behaviour {

  private system: Primary;
  target: Ship;

  constructor(target: Ship) {
    super('primary_attack', target);

    this.system = PRIMARY.getSystem(this.target.primaryWeapon, this.target)
    this.target.primaryCooldownMax = this.system.fireRate;
    this.target.primaryCooldown = this.system.fireRate;
  }

  public onEvent(): void {
    if(!this.canFire()) return;
    this.target.primaryCooldown = 0;

    this.system.spawnBullets(this.target);

    if(this.target.weaponCharge != 1) {
      this.target.setWeaponCharge(1);
    }
  }

  public onUpdate(deltaTime: number): void {
    if(this.target.primaryCooldown <= this.target.primaryCooldownMax) {
      this.target.primaryCooldown += deltaTime;
    }
  }

  canFire(): boolean {
    return this.target.primaryCooldown >= this.target.primaryCooldownMax;
  }

}
