import { Behaviour } from '../behaviour';
import { C, WEAPONS } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

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
    let bullet = this.system.getBullet(spawn_location.x, spawn_location.y);
    bullet.fired_by = this.target;
    this.target.$state.addBullet(bullet);
  }

  public onUpdate(deltaTime:number) {
    if(this.target.primary_cooldown <= this.target.primary_cooldown_max) {
      this.target.primary_cooldown += deltaTime;
    }
  }

  setWeaponSystem() {
    let system_type = WEAPONS.PRIMARY[this.target.weapon_mesh]["system_type"];
    this.system = new system_type({
      entity: this.target,
      damage: WEAPONS.PRIMARY[this.target.weapon_mesh]["damage"],
      range: WEAPONS.PRIMARY[this.target.weapon_mesh]["range"],
      speed: WEAPONS.PRIMARY[this.target.weapon_mesh]["speed"],
      radius: WEAPONS.PRIMARY[this.target.weapon_mesh]["radius"],
      fire_rate: WEAPONS.PRIMARY[this.target.weapon_mesh]["fire_rate"]
    });
    console.log(this.system);
  }
das
  canFire():boolean {
    return this.target.primary_cooldown >= this.target.primary_cooldown_max;
  }

}
