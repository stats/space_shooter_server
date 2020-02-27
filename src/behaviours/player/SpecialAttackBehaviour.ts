import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { SPECIAL } from '../../Special';
import { Bounds } from '../../helpers/Bounds';


export class SpecialAttackBehaviour extends Behaviour {

  private system:any;

  constructor(target) {
    super('special_attack', target);
    let system_type = SPECIAL.TYPE[this.target.special_weapon]["system_type"];
    this.system = new system_type(this.target);
    this.system.duration = SPECIAL.TYPE[this.target.special_weapon]["duration"] || 0;
    this.system.amount = SPECIAL.TYPE[this.target.special_weapon]["amount"] || 0;
    this.target.special_cooldown_max = SPECIAL.TYPE[this.target.special_weapon]["fire_rate"];
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
    this.system.handleUpdate(deltaTime);
  }

  canFire():boolean {
    return this.target.special_cooldown >= this.target.special_cooldown_max;
  }

}
