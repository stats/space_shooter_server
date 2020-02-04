import { SpecialSystem } from './SpecialSystem';

export class ShieldRecharge extends SpecialSystem {

  handleEvent() {
    this.target.shields = Math.min(this.target.shields + this.amount, this.target.max_shields);
  }
}
