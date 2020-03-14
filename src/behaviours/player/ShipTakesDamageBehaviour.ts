import { Behaviour, Ship } from '../../Internal';

export class ShipTakesDamageBehaviour extends Behaviour {

  target: Ship;

  timer = 0;
  cooldown = 250;

  constructor(target: Ship) {
    super('take_damage', target);
  }

  public onUpdate(deltaTime: number) {
    if(this.target.justDamaged) {
      this.timer += deltaTime;
      if(this.timer >= this.cooldown) {
        this.target.justDamaged = false;
        this.timer = 0;
      }
    }
  }

  public onEvent(args: {damage: number}): void {
    if(this.target.justDamaged) return;

    this.target.shields = Math.max(this.target.shields - args.damage, 0);
    this.target.justDamaged = true;
    if(this.target.shields <= 0) {
      this.target.handleEvent('destroyed');
    }
  }

}
