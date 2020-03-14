import { Bullet, C, CT, BulletStraightLineDownPath, BulletStraightAnglePath, Primary, Position } from '../../Internal';

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
        bullet.registerBehaviour("path", new BulletStraightLineDownPath(bullet));
      break;
      case 'fires':
        bullet.registerBehaviour("path", new BulletStraightAnglePath(bullet, {angle: this.entity.angle}));
      break;
    }
    bullets.push(bullet);

    return bullets;
  }
}
