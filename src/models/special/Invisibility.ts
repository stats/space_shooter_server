import { SpecialSystem } from './SpecialSystem';

export class Invisibility extends SpecialSystem {

  handleEvent() {
    this.target.invisible = true;
    this.active = true;
  }

  handleUpdate(deltaTime:number) {
    if(!this.active) return;

    this.timer += deltaTime;
    if(this.timer >= this.duration) {
      this.target.invisible = false;
      this.timer = 0;
      this.active = false;
    }
  }

}
