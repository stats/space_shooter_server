import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { PRIMARY } from '../../Primary';
import { Bounds } from '../../helpers/Bounds';
import { Bullet } from '../../models/bullet';


export class PrimaryAttackBehaviour extends Behaviour {

  private system:any;

  constructor(target) {
    super('primary_attack', target);
    this.setWeaponSystem();
    this.target.primary_cooldown_max = this.system.fire_rate;
    this.target.primary_cooldown = this.system.fire_rate;
  }

  public onEvent() {
    if(!this.canFire()) return;
    this.target.primary_cooldown = 0;
    let spawn_location = this.target.getBulletSpawnLocation();
    let bullets:Bullet[] = this.system.getBullets(spawn_location.x, spawn_location.y);
    for(var i = 0; i < bullets.length; i++) {
      bullets[i].fired_by = this.target;
      this.target.$state.addBullet(bullets[i]);
    }
    if(this.target.weaponCharge != 1) {
      this.target.setWeaponCharge(1);
    }
  }

  public onUpdate(deltaTime:number) {
    if(this.target.primary_cooldown <= this.target.primary_cooldown_max) {
      this.target.primary_cooldown += deltaTime;
    }
  }

  setWeaponSystem() {
    let system_type = PRIMARY.TYPE[this.target.primary_weapon]["system_type"];
    this.system = new system_type( this.target, PRIMARY.TYPE[this.target.primary_weapon]);
  }

  canFire():boolean {
    return this.target.primary_cooldown >= this.target.primary_cooldown_max;
  }

}
