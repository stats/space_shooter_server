import { SpecialSystem } from './SpecialSystem';

export class HyperSpeed extends SpecialSystem {

  handleEvent() {
    this.target.position.x += this.amount * this.target.horizontalAccelleration;
    this.target.position.y += this.amount * this.target.verticalAccelleration;
    this.target.clampToBounds();
  }

}
