import { SpecialSystem } from './SpecialSystem';

export class HyperSpeed extends SpecialSystem {

  handleEvent() {
    this.target.position.x += this.amount * this.target.horizontal_accelleration;
    this.target.position.y += this.amount * this.target.vertical_accelleration;
    this.target.clampToBounds();
  }

}
