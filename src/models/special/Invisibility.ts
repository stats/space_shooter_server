import { SpecialSystem } from '../../Internal';

export class Invisibility extends SpecialSystem {

  handleEvent(): void {
    this.target.invisible = true;
    this.active = true;
  }

  handleUpdate(deltaTime: number): void {
    if(!this.active) return;

    this.timer += deltaTime;
    if(this.timer >= this.duration) {
      this.target.invisible = false;
      this.timer = 0;
      this.active = false;
    }
  }

}
