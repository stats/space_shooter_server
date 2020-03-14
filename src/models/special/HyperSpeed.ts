import { SpecialSystem } from '../../Internal';

export class HyperSpeed extends SpecialSystem {

  handleEvent(): void {
    this.target.position.x += this.amount * this.target.horizontalAccelleration;
    this.target.position.y += this.amount * this.target.verticalAccelleration;
    this.target.clampToBounds();
  }

}
