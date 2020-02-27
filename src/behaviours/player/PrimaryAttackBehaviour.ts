import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { PRIMARY } from '../../Primary';
import { Bounds } from '../../helpers/Bounds';
import { Bullet } from '../../models/Bullet';


export class PrimaryAttackBehaviour extends Behaviour {

  private system:any;

  constructor(target) {
    super('primary_attack', target);

    this.system = PRIMARY.getSystem(this.target.primary_weapon, this.target)
    this.target.primary_cooldown_max = this.system.fire_rate;
    this.target.primary_cooldown = this.system.fire_rate;
  }

  public onEvent() {
    if(!this.canFire()) return;
    this.target.primary_cooldown = 0;

    this.system.spawnBullets(this.target);

    if(this.target.weaponCharge != 1) {
      this.target.setWeaponCharge(1);
    }
  }

  public onUpdate(deltaTime:number) {
    if(this.target.primary_cooldown <= this.target.primary_cooldown_max) {
      this.target.primary_cooldown += deltaTime;
    }
  }

  canFire():boolean {
    return this.target.primary_cooldown >= this.target.primary_cooldown_max;
  }

}
