import { Behaviour, SPECIAL, Ship, SpecialSystem } from '../../Internal';


export class SpecialAttackBehaviour extends Behaviour {

  private system: SpecialSystem;

  target: Ship;

  constructor(target: Ship) {
    super('special_attack', target);
    const systemType = SPECIAL.TYPE[this.target.specialWeapon]["systemType"];
    this.system = new systemType(this.target);
    this.system.duration = SPECIAL.TYPE[this.target.specialWeapon]["duration"] || 0;
    this.system.amount = SPECIAL.TYPE[this.target.specialWeapon]["amount"] || 0;
    this.target.specialCooldownMax = SPECIAL.TYPE[this.target.specialWeapon]["fireRate"];
    this.target.specialCooldown = this.target.specialCooldownMax;
  }

  public onEvent(): void {
    if(!this.canFire()) return;
    this.target.specialCooldown = 0;
    this.system.handleEvent();
  }

  public onUpdate(deltaTime: number): void {
    if(this.target.specialCooldown <= this.target.specialCooldownMax) {
      this.target.specialCooldown += deltaTime;
    }
    this.system.handleUpdate(deltaTime);
  }

  canFire(): boolean {
    return this.target.specialCooldown >= this.target.specialCooldownMax;
  }

}
