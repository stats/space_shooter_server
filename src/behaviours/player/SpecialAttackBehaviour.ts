import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';
import { EmergencyBrake } from '../../models/specials/emergency_brake';

export class SpecialAttackBehaviour extends Behaviour {

  private special_systems = [
    {
      system_type: EmergencyBrake,
      fire_rate: 2000
    }
  ];

  private cooldown:number = 0;
  private fire_rate:number = 0;
  private system:any;

  constructor(target) {
    super('special_attack', target);
    let system_type = this.special_systems[this.target.special_attack]["system_type"];
    this.system = new system_type(this.target);
    this.fire_rate = this.special_systems[this.target.special_attack]["fire_rate"];
  }

  public onEvent() {
    if(!canFire()) return;
    this.cooldown = 0;
    this.system.handleEvent();
  }

  public onUpdate(deltaTime:number) {
    if(this.cooldown <= this.fire_rate) {
      this.cooldown += deltaTime;
        this.target.special_cooldown = this.cooldown;
    }
  }

  canFire():boolean {
    return this.cooldown >= this.fire_rate;
  }

}
