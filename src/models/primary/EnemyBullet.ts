import { Bullet } from '../Bullet';
import { C, CT } from '../../Constants';
import { StraightLineDownPath } from '../../behaviours/bullet/StraightLineDownPath';
import { StraightAnglePath } from '../../behaviours/bullet/StraightAnglePath';
import { Primary } from './Primary';
import { Position } from '../Position';

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
      position: this.entity.position.clone(),
      bulletType: C.ENEMY_BULLET
    }

    const bullet = new Bullet(options);
    switch(this.behaviour) {
      case 'drops':
        console.log("Adding drops bullet behaviour");
        bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      case 'fires':
        bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.entity.angle}));
      break;
    }
    bullets.push(bullet);

    return bullets;
  }
}
