import { Bullet } from '../Bullet';
import { C, CT } from '../../Constants';
import { StraightLineDownPath } from '../../behaviours/bullet/StraightLineDownPath';
import { StraightAnglePath } from '../../behaviours/bullet/StraightAnglePath';
import { Primary } from './Primary';
import { Position } from '../Position';

export class EnemyBullet extends Primary{

  getBullets(): Bullet[] {
    const bullets: Bullet[] = [];
    if(this.entity.bulletOffsets == null || this.entity.bulletOffsets.length <= 0) {
      this.entity.bulletOffsets = [
        new Position(0, 0)
      ];
    }

    for(let i = 0; i < this.entity.bulletOffsets.length; i++) {
      let position = this.entity.position.clone();
      position.x += this.entity.bulletOffsets[i].x;
      position.y += this.entity.bulletOffsets[i].y;

      const options = {
        damage: this.damage,
        speed: this.speed,
        range: this.range,
        collisionType: CT.CIRCLE,
        radius: this.radius,
        bulletMesh: this.bulletMesh,
        position: position,
        bulletType: C.ENEMY_BULLET
      }

      const bullet = new Bullet(options);
      switch(this.behaviour) {
        case 'drops':
          bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
        break;
        case 'fires':
          bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.entity.angle}));
        break;
      }
      bullets.push(bullet);
    }

    return bullets;
  }
}
