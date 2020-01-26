import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { PRIMARY } from '../../Primary';
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
    let system_type = PRIMARY.TYPE[this.target.primary_weapon]["system_type"];
    this.system = new system_type({
      entity: this.target,
      damage: PRIMARY.TYPE[this.target.primary_weapon]["damage"],
      range: PRIMARY.TYPE[this.target.primary_weapon]["range"],
      speed: PRIMARY.TYPE[this.target.primary_weapon]["speed"],
      radius: PRIMARY.TYPE[this.target.primary_weapon]["radius"],
      fire_rate: PRIMARY.TYPE[this.target.primary_weapon]["fire_rate"]
    });
    console.log(this.system);
  }
das
  canFire():boolean {
    return this.target.primary_cooldown >= this.target.primary_cooldown_max;
  }

}
