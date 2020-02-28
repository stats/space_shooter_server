import { SpecialSystem } from './SpecialSystem';

export class EmergencyBrake extends SpecialSystem {

  handleEvent(): void {
    this.target.verticalAccelleration = 0;
    this.target.horizontalAccelleration = 0;
  }
}
