import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';

export class DestroyedBehaviour extends Behaviour {

  target: Bullet;

  constructor(target: Bullet) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeBullet(this.target);
  }
}
