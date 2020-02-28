import { Behaviour } from '../behaviour';
import { Entity } from '../../models/Entity';
import { Bullet } from '../../models/Bullet';

export class DestroyedBehaviour extends Behaviour {

  constructor(target: Entity) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeBullet(this.target as Bullet);
  }
}
