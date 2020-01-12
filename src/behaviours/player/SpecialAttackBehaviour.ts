import { Behaviour } from '../behaviour';
import { C, WEAPONS } from '../../constants';
import { Bounds } from '../../helpers/Bounds';
import { EmergencyBrake } from '../../models/specials/emergency_brake';
import { Shotgun } from '../../models/specials/shotgun';
import { ScatterShot } from '../../models/specials/scatter_shot';

export class SpecialAttackBehaviour extends Behaviour {

  private system:any;

  constructor(target) {
    super('special_attack', target);
    let system_type = WEAPONS.SPECIAL[this.target.special_mesh]["system_type"];
    this.system = new system_type(this.target);
    this.target.special_cooldown_max = WEAPONS.SPECIAL[this.target.special_mesh]["fire_rate"];
    this.target.special_cooldown = this.target.special_cooldown_max;
  }

  public onEvent() {
    if(!this.canFire()) return;
    this.target.special_cooldown = 0;
    this.system.handleEvent();
  }

  public onUpdate(deltaTime:number) {
    if(this.target.special_cooldown <= this.target.special_cooldown_max) {
      this.target.special_cooldown += deltaTime;
    }
  }

  canFire():boolean {
    return this.target.special_cooldown >= this.target.special_cooldown_max;
  }

}
