import { Bullet } from '../Bullet';
import { C, CT } from '../../Constants';
import { StraightLineDownPath } from '../../behaviours/Bullet/StraightLineDownPath';
import { StraightAnglePath } from '../../behaviours/Bullet/StraightAnglePath';
import { Primary } from './Primary';

export class EnemyBullet extends Primary{

  getBullets(): Bullet[] {
    const bullets: Bullet[] = [];
    const options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      collisionType: CT.CIRCLE,
      radius: this.radius,
      bulletMesh: this.bulletMesh,
      x: this.entity.position.x,
      y: this.entity.position.y,
      bulletType: C.ENEMY_BULLET
    }

    const bullet = new Bullet(options);
    switch(this.behaviour) {
      case 'drops':
        bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.entity.angle}));
      case 'fires':
        bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      break;
    }
    bullets.push(bullet);

    return bullets;
  }
}
