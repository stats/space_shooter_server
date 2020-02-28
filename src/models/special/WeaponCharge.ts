import { SpecialSystem } from './SpecialSystem';

export class WeaponCharge extends SpecialSystem {

  handleEvent(): void {
    this.target.setWeaponCharge(this.amount);
  }

}
