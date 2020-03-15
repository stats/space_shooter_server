import { SpecialSystem } from './SpecialSystem';

export class HyperSpeed extends SpecialSystem {

  handleEvent(): void {
    this.target.position.x += this.amount * (this.target.lastPosition.x - this.target.position.x);
    this.target.position.y += this.amount * (this.target.lastPosition.y - this.target.position.y);
    this.target.clampToBounds();
  }

}
