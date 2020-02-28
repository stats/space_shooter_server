import { SpecialSystem } from './SpecialSystem';

export class ForceShield extends SpecialSystem {

  handleEvent() {
    this.target.collisionInvulnerable = true;
    this.target.bulletInvulnerable = true;
    this.active = true;
  }

  handleUpdate(deltaTime: number) {
    if(!this.active) return;

    this.timer += deltaTime;
    if(this.timer >= this.duration) {
      this.target.collisionInvulnerable = false;
      this.target.bulletInvulnerable = false;
      this.timer = 0;
      this.active = false;
    }
  }

}
