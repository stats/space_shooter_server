/* A straight shot that has an explosion on impact */

import { Bullet } from '../Bullet';
import { C, CT } from '../../Constants';
import { Entity } from '../Entity';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';
import { ExplodeBehaviour } from '../../behaviours/bullet/ExplodeBehaviour';
import { Primary } from './Primary';
import { Position } from '../Position';

export class Torpedo extends Primary {

  constructor(entity: Entity, options: any) {
    super(entity, options);
  }

  getBullets(): Bullet[] {
    const bullets: Bullet[] = [];

    let offsetStart = 0;
    if(this.bulletOffset != 0) {
      offsetStart = -(this.bulletCount * this.bulletOffset) / 2;
    }

    for(let i = 0; i < this.bulletCount; i++){

      const options = {
        damage: this.damage,
        speed: this.speed,
        range: this.range,
        collisionType: CT.CIRCLE,
        radius: this.radius,
        bulletMesh: this.bulletMesh,
        postion: this.entity.getBulletSpawnLocation(),
        bulletType: C.SHIP_BULLET,
        explodes: true,
        blastRadius: this.blastRadius
      }

      const bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offsetStart + (i * this.bulletOffset);
      bullet.registerBehaviour("path", new StraightLineUpPath(bullet));
      bullet.registerBehaviour("explode", new ExplodeBehaviour(bullet));
      bullets.push(bullet);
    }

    return bullets;
  }
}
