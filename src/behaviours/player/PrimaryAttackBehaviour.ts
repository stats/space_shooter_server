import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';
import { Basic } from '../../models/weapon_system/basic';
import { Blaster } from '../../models/weapon_system/blaster';

export class PrimaryAttackBehaviour extends Behaviour {

  private system:any;

  private weapon_systems = [
    {
      system_type: Basic,
      damage: 1,
      range: 500,
      speed: 400,
      fire_rate: 1000,
      radius: 15
    },
    {
      system_type: Blaster,
      damage: 2,
      range: 300,
      speed: 250,
      fire_rate: 1500,
      radius: 15
    }
  ]

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
    let system_type = this.weapon_systems[this.target.primary_attack]["system_type"];
    this.system = new system_type({
      entity: this.target,
      damage: this.weapon_systems[this.target.primary_attack]["damage"],
      range: this.weapon_systems[this.target.primary_attack]["range"],
      speed: this.weapon_systems[this.target.primary_attack]["speed"],
      radius: this.weapon_systems[this.target.primary_attack]["radius"],
      fire_rate: this.weapon_systems[this.target.primary_attack]["fire_rate"]
    });
    console.log(this.system);
  }
das
  canFire():boolean {
    return this.target.primary_cooldown >= this.target.primary_cooldown_max;
  }

}
