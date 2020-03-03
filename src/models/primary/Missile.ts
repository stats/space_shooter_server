import { Bullet } from '../Bullet';
import { C, CT } from '../../Constants';
import { Entity } from '../Entity';
import { MissilePath } from '../../behaviours/Bullet/MissilePath';
import { Primary } from './Primary';
import { Position } from '../Position';

export class Missile extends Primary {

  constructor(entity: Entity, options: any) {
    super(entity, options);
  }

  getBullets(): Bullet[] {
    const bullets: Bullet[] = [];

    let offsetStart = 0;
    if(this.bulletOffset != 0) {
      offsetStart = -(this.bulletCount * this.bulletOffset) / 2;
    }

    for(let i = 0; i < this.bulletCount; i++) {
      const options = {
        damage: this.damage,
        speed: this.speed,
        range: this.range,
        collisionType: CT.CIRCLE,
        radius: this.radius,
        bulletMesh: this.bulletMesh,
        position: this.entity.getBulletSpawnLocation(),
        bulletType: C.SHIP_BULLET
      }

      let angle = Math.PI/2;
      if( (i == 0 && this.bulletCount == 2) || (i == 1 && this.bulletCount == 3)) {
        angle -= this.bulletAngle;
      }  else if ( ( i == 1 && this.bulletCount == 2 ) || (i == 2 && this.bulletCount == 3)) {
        angle += this.bulletAngle;
      }

      const bullet = new Bullet(options);
      bullet.registerBehaviour("path", new MissilePath(bullet, {angle: Math.PI/2}));
      bullets.push( bullet );
    }

    return bullets;
  }
}
