import { Behaviour } from '../behaviour';
import { Entity } from '../../models/Entity';
import { Enemy } from '../../models/Enemy';

export class DestroyedBehaviour extends Behaviour {

  target: Enemy;

  constructor(target: Enemy) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeEnemy(this.target);
  }
}
