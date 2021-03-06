import { Behaviour } from '../behaviour';
import { Drop } from '../../models';

export class DespawnAfterTime extends Behaviour {

  target: Drop;

  timer = 0;
  cooldown = 10000;

  constructor(target: Drop) {
    super('despawnAfterTime', target);
  }

  onUpdate(deltaTime: number): void {
    this.timer += deltaTime;
    if(this.timer >= this.cooldown) {
      this.target.handleEvent('destroyed');
    }
  }
}
