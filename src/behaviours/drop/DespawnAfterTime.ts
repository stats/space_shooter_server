import { Behaviour } from '../behaviour';
import { Drop } from '../../models';

export class DespawnAfterTime extends Behaviour {

  target: Drop;

  timer: number = 0;
  cooldown: number = 10;

  constructor(target: Drop) {
    super('despawnAfterTime', target);
  }

  onUpdate(deltaTime: number): void {
    this.timer += deltaTime;
    if(this.timer >= this.cooldown) {
      this.target.handleEvent('destroyed');
    }
  }

  onEvent(): void {
    this.target.$state.removeDrop(this.target);
  }
}
