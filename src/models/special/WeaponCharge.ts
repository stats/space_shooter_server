import { SpecialSystem } from '../../Internal';

export class WeaponCharge extends SpecialSystem {

  handleEvent(): void {
    this.target.setWeaponCharge(this.amount);
  }

}
