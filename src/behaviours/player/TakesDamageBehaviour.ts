import { Behaviour } from '../behaviour';
import { Ship } from '../../models/Ship';

export class TakesDamageBehaviour extends Behaviour {

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

    this.target.shield = Math.max(this.target.shield - args.damage, 0);
    this.target.justDamaged = true;
    if(this.target.shield <= 0) {
      this.target.handleEvent('destroyed');
    }
  }

}
