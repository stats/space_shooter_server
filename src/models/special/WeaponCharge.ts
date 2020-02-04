import { SpecialSystem } from './SpecialSystem';

export class WeaponCharge extends SpecialSystem {

  handleEvent() {
    this.target.setWeaponCharge(this.amount);
  }

}
