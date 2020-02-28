import { SpecialSystem } from './SpecialSystem';

export class Thrusters extends SpecialSystem {

  handleEvent() {
    this.target.setThrusters(this.amount);
    this.active = true;
  }

  handleUpdate(deltaTime: number) {
    if(!this.active) return;

    this.timer += deltaTime;
    if(this.timer >= this.duration) {
      this.target.setThrusters(1);
      this.timer = 0;
      this.active = false;
    }
  }

}
