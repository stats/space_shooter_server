import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';
import { EmergencyBrake } from '../../models/specials/emergency_brake';
import { Shotgun } from '../../models/specials/shotgun';

export class SpecialAttackBehaviour extends Behaviour {

  private special_systems = [
    {
      system_type: EmergencyBrake,
      fire_rate: 2000
    },
    {
      system_type: Shotgun,
      fire_rate: 10000
    },
    {
      system_type: ScatterShot,
      fire_rate: 30000
    }
  ];

  private system:any;

  constructor(target) {
    super('special_attack', target);
    let system_type = this.special_systems[this.target.special_attack]["system_type"];
    this.system = new system_type(this.target);
    this.target.special_cooldown_max = this.special_systems[this.target.special_attack]["fire_rate"];
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
