/* Basic bullet */

/* This is also the mechanism for firing the bullet */

import { Bullet } from '../Bullet';
import { Entity } from '../Entity';
import { C, CT } from '../../Constants';
import { StraightLineUpPath } from '../../behaviours/Bullet/StraightLineUpPath';
import { StraightAnglePath } from '../../behaviours/Bullet/StraightAnglePath';
import { Primary } from './Primary';
import { Position } from '../Position';

export class Cannon extends Primary {

  constructor(entity: Entity, options: any) {
    super(entity, options);
  }

  getBullets(): Bullet[] {
    const spawnLocation: Position = this.entity.getBulletSpawnLocation();

    const bullets: Bullet[] = [];

    for(let i = 0; i < this.bulletCount; i++) {
      const options = {
        damage: this.damage,
        speed: this.speed,
        range: this.range,
        collisionType: CT.CIRCLE,
        radius: this.radius,
        bulletMesh: this.bulletMesh,
        position: spawnLocation,
        bulletType: C.SHIP_BULLET
      }

      let angle = Math.PI/2;
      if( (i == 0 && this.bulletCount == 2) || (i == 1 && this.bulletCount == 3)) {
        angle -= this.bulletAngle;
      }  else if ( ( i == 1 && this.bulletCount == 2 ) || (i == 2 && this.bulletCount == 3)) {
        angle += this.bulletAngle;
      }

      let bullet = new Bullet(options);
      bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: Math.PI/2 - this.bulletAngle}));
      bullets.push( bullet );
    }

    return bullets;
  }
}
