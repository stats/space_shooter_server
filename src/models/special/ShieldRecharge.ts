import { SpecialSystem } from './SpecialSystem';

export class ShieldRecharge extends SpecialSystem {

  handleEvent(): void {
    this.target.shields = Math.min(this.target.shields + this.amount, this.target.maxShields);
  }
}
