import { SpecialSystem } from '../../Internal';

export class RammingShield extends SpecialSystem {

  handleEvent(): void {
    this.target.collisionInvulnerable = true;
    this.active = true;
  }

  handleUpdate(deltaTime: number): void {
    if(!this.active) return;

    this.timer += deltaTime;
    if(this.timer >= this.duration) {
      this.target.collisionInvulnerable = false;
      this.timer = 0;
      this.active = false;
    }
  }

}
