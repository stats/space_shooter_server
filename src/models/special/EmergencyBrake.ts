import { SpecialSystem } from './SpecialSystem';

export class EmergencyBrake extends SpecialSystem {

  handleEvent() {
    this.target.vertical_accelleration = 0;
    this.target.horizontal_accelleration = 0;
  }
}
