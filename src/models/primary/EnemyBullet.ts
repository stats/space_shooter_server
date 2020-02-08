import { Bullet } from '../bullet';
import { C, CT } from '../../constants';
import { GameState } from '../GameState';
import { Entity } from '../entity';
import { StraightLineDownPath } from '../../behaviours/bullet/StraightLineDownPath';
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
    bullet.registerBehaviour(new StraightLineDownPath(bullet));
    bullets.push(bullet);

    return bullets;
  }
}
