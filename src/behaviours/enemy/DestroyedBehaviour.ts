import { Behaviour } from '../behaviour';
import { Entity } from '../../models/Entity';

export class DestroyedBehaviour extends Behaviour {

  constructor(target: Entity) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeEnemy(this.target);
  }
}
