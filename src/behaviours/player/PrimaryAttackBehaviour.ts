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
      range: 200,
      speed: 1,
      fire_rate: 1000
    }
  ]

  constructor(target) {
    super('primary_attack', target);
    this.setWeaponSystem();
  }

  public onEvent() {
    console.log("Primary Attack");
    if(!this.canFire()) return;

    console.log("Allowed to fire");

    let spawn_location = this.target.getBulletSpawnLocation();
    let bullet = this.system.getBullet(spawn_location.x, spawn_location.y);
    this.target.$state.addBullet(bullet);
  }

  public onUpdate(deltaTime:number) {
    if(this.cooldown <= this.fire_rate) {
      this.cooldown += deltaTime;
    }
  }

  setWeaponSystem() {
    let system_type = this.weapon_systems[this.target.primary_attack]["system_type"];
    this.system = new system_type({
      damage: this.weapon_systems[this.target.primary_attack]["damage"],
      range: this.weapon_systems[this.target.primary_attack]["range"],
      speed: this.weapon_systems[this.target.primary_attack]["speed"]
    });
    this.fire_rate = this.weapon_systems[this.target.primary_attack]["fire_rate"];
  }

  canFire():boolean {
    console.log(this.cooldown, this.fire_rate);
    return this.cooldown >= this.fire_rate;
  }

}
