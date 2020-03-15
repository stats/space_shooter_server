import { SpecialSystem } from './SpecialSystem';

export class ShieldRecharge extends SpecialSystem {

  handleEvent(): void {
    this.target.shield = Math.min(this.target.shield + this.amount, this.target.maxShield);
  }
}
