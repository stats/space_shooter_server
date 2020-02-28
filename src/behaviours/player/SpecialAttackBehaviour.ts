import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { SPECIAL } from '../../Special';
import { Bounds } from '../../helpers/Bounds';


export class SpecialAttackBehaviour extends Behaviour {

  private system: any;

  constructor(target) {
    super('special_attack', target);
    const systemType = SPECIAL.TYPE[this.target.special_weapon]["systemType"];
    this.system = new systemType(this.target);
    this.system.duration = SPECIAL.TYPE[this.target.special_weapon]["duration"] || 0;
    this.system.amount = SPECIAL.TYPE[this.target.special_weapon]["amount"] || 0;
    this.target.specialCooldownMax = SPECIAL.TYPE[this.target.special_weapon]["fireRate"];
    this.target.specialCooldown = this.target.specialCooldownMax;
  }

  public onEvent() {
    if(!this.canFire()) return;
    this.target.specialCooldown = 0;
    this.system.handleEvent();
  }

  public onUpdate(deltaTime: number) {
    if(this.target.specialCooldown <= this.target.specialCooldownMax) {
      this.target.specialCooldown += deltaTime;
    }
    this.system.handleUpdate(deltaTime);
  }

  canFire(): boolean {
    return this.target.specialCooldown >= this.target.specialCooldownMax;
  }

}
