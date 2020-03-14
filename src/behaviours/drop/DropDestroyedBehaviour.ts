import { Behaviour, Drop } from '../../Internal';

export class DropDestroyedBehaviour extends Behaviour {

  target: Drop;

  constructor(target: Drop) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeDrop(this.target);
  }
}
