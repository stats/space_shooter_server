import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { PRIMARY } from '../../Primary';
import { Bounds } from '../../helpers/Bounds';
import { Bullet } from '../../models/Bullet';


export class PrimaryAttackBehaviour extends Behaviour {

  private system: any;

  constructor(target) {
    super('primary_attack', target);

    this.system = PRIMARY.getSystem(this.target.primary_weapon, this.target)
    this.target.primaryCooldownMax = this.system.fireRate;
    this.target.primaryCooldown = this.system.fireRate;
  }

  public onEvent() {
    if(!this.canFire()) return;
    this.target.primaryCooldown = 0;

    this.system.spawnBullets(this.target);

    if(this.target.weaponCharge != 1) {
      this.target.setWeaponCharge(1);
    }
  }

  public onUpdate(deltaTime: number) {
    if(this.target.primaryCooldown <= this.target.primaryCooldownMax) {
      this.target.primaryCooldown += deltaTime;
    }
  }

  canFire(): boolean {
    return this.target.primaryCooldown >= this.target.primaryCooldownMax;
  }

}
