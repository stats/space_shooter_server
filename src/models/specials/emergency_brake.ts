import { Ship } from '../ship';

export class EmergencyBrake {

  private target:Ship;

  constructor(target:Ship) {
    this.ship = ship;
  }

  handleEvent() {
    this.ship.vertical_accelleration = 0;
    this.ship.horizontal_accelleration = 0;
  }

}
