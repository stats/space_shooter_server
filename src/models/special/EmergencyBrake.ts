import { SpecialSystem } from '../../Internal';

export class EmergencyBrake extends SpecialSystem {

  handleEvent(): void {
    this.target.verticalAccelleration = 0;
    this.target.horizontalAccelleration = 0;
  }
}
