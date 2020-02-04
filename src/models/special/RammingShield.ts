import { Ship } from '../ship';import { SpecialSystem } from './SpecialSystem';
export class RammingShield extends SpecialSystem {

  handleEvent() {
    this.target.collision_invulnerable = true;
    this.active = true;
  }

  handleUpdate(deltaTime:number) {
    if(!this.active) return;

    this.timer += deltaTime;
    if(this.timer >= this.duration) {
      this.target.collision_invulnerable = false;
      this.timer = 0;
      this.active = false;
    }
  }

}
