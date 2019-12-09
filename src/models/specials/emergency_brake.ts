import { Ship } from '../ship';

export class EmergencyBrake {

  private target:Ship;

  constructor(target:Ship) {
    this.target = target;
  }

  handleEvent() {
    this.target.vertical_accelleration = 0;
    this.target.horizontal_accelleration = 0;
  }

  //TODO: ADD COOLDOWN
}
