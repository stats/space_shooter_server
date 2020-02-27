import { Bullet } from '../Bullet';
import { C, CT } from '../../Constants';
import { GameState } from '../GameState';
import { Entity } from '../Entity';
import { StraightLineDownPath } from '../../behaviours/Bullet/StraightLineDownPath';
import { StraightAnglePath } from '../../behaviours/Bullet/StraightAnglePath';
import { Primary } from './Primary';

export class EnemyBullet extends Primary{

  getBullets():Bullet[] {
    let bullets:Bullet[] = [];
    let options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      collision_type: CT.CIRCLE,
      radius: this.radius,
      bullet_mesh: this.bullet_mesh,
      x: this.entity.position.x,
      y: this.entity.position.y,
      bullet_type: C.ENEMY_BULLET
    }

    let bullet = new Bullet(options);
    switch(this.behaviour) {
      case 'drops':
        bullet.registerBehaviour(new StraightAnglePath(bullet, {angle: this.entity.angle}));
      case 'fires':
        bullet.registerBehaviour(new StraightLineDownPath(bullet));
      break;
    }
    bullets.push(bullet);

    return bullets;
  }
}
