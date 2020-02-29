/* Basic bullet */

/* This is also the mechanism for firing the bullet */

import { Bullet } from '../Bullet';
import { Entity } from '../Entity';
import { C, CT } from '../../Constants';
import { StraightLineUpPath } from '../../behaviours/Bullet/StraightLineUpPath';
import { StraightAnglePath } from '../../behaviours/Bullet/StraightAnglePath';
import { Primary } from './Primary';

export class Cannon extends Primary {

  constructor(entity: Entity, options: any) {
    super(entity, options);
  }

  getBullets(): Bullet[] {
    const spawnLocation = this.entity.getBulletSpawnLocation();

    const bullets: Bullet[] = [];
    const options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      collisionType: CT.CIRCLE,
      radius: this.radius,
      bulletMesh: this.bulletMesh,
      x: spawnLocation.x,
      y: spawnLocation.y,
      bulletType: C.SHIP_BULLET
    }

    if(this.bullet_count == 1){
      const bullet = new Bullet(options);
      bullet.registerBehaviour("path", new StraightLineUpPath(bullet));
      bullets.push( bullet );
    } else if (this.bullet_count == 2){
      let bullet = new Bullet(options);
      bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: Math.PI/2 - this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: Math.PI/2 + this.bullet_angle}));
      bullets.push(bullet);
    } else if (this.bullet_count == 3){

      let bullet = new Bullet(options);
      bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: Math.PI/2 -this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: Math.PI/2 +this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.registerBehaviour("path", new StraightLineUpPath(bullet));
      bullets.push(bullet);

    }

    return bullets;
  }
}
