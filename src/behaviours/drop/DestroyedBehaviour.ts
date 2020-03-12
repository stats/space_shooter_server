import { Behaviour } from '../behaviour';
import { Drop } from '../../models';

export class DestroyedBehaviour extends Behaviour {

  target: Drop;

  constructor(target: Drop) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeDrop(this.target);
  }
}
