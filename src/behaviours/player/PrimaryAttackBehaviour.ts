import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';
import { Basic } from '../../models/weapon_system/basic';

export class PrimaryAttackBehaviour extends Behaviour {

  private system:any;
  private cooldown:number = 0;
  private fire_rate:number = 0;

  private weapon_systems = [
    {
      system_type: Basic,
      damage: 1,
      range: 500,
      speed: 400,
      fire_rate: 1000,
      diameter: 15,
    }
  ]

  constructor(target) {
    super('primary_attack', target);
    this.setWeaponSystem();
    this.target.primary_cooldown_max = this.fire_rate;
  }

  public onEvent() {
    if(!this.canFire()) return;
    this.cooldown = 0;
    let spawn_location = this.target.getBulletSpawnLocation();
    let bullet = this.system.getBullet(spawn_location.x, spawn_location.y);
    bullet.fired_by = this.target;
    this.target.$state.addBullet(bullet);
  }

  public onUpdate(deltaTime:number) {
    if(this.cooldown <= this.fire_rate) {
      this.cooldown += deltaTime;
        this.target.primary_cooldown = this.cooldown;
    }
  }

  setWeaponSystem() {
    let system_type = this.weapon_systems[this.target.primary_attack]["system_type"];
    this.system = new system_type({
      entity: this.target,
      damage: this.weapon_systems[this.target.primary_attack]["damage"],
      range: this.weapon_systems[this.target.primary_attack]["range"],
      speed: this.weapon_systems[this.target.primary_attack]["speed"],
      diameter: this.weapon_systems[this.target.primary_attack]["diameter"],
      fire_rate: this.weapon_systems[this.target.primary_attack]["fire_rate"]
    });

  }

  canFire():boolean {
    return this.cooldown >= this.system.fire_rate;
  }

}
