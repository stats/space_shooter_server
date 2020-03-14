import { Behaviour, Bullet } from '../../Internal';

export class BulletDestroyedBehaviour extends Behaviour {

  target: Bullet;

  constructor(target: Bullet) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeBullet(this.target);
  }
}
