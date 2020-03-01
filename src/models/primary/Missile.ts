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
    const spawnLocation: Position = this.entity.getBulletSpawnLocation();

    const bullets: Bullet[] = [];
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

    let offsetStart = 0;
    if(this.bulletOffset != 0) {
      offsetStart = -(this.bulletCount * this.bulletOffset) / 2;
    }
    let bullet;
    if(this.bulletCount == 1){
      bullet = new Bullet(options);
      bullet.registerBehaviour("path", new MissilePath(bullet, {angle: Math.PI/2}));
      bullets.push( bullet );
    } else if (this.bulletCount == 2){
      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offsetStart;
      bullet.registerBehaviour("path", new MissilePath(bullet, {angle: Math.PI/2 - this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offsetStart + this.bulletOffset;
      bullet.registerBehaviour("path", new MissilePath(bullet, {angle: Math.PI/2 + this.bullet_angle}));
      bullets.push(bullet);
    } else if (this.bulletCount == 3){
      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offsetStart;
      bullet.registerBehaviour("path", new MissilePath(bullet, {angle: Math.PI/2 -this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offsetStart + this.bulletOffset;
      bullet.registerBehaviour("path", new MissilePath(bullet, {angle: Math.PI/2 +this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offsetStart + (2 * this.bulletOffset);
      bullet.registerBehaviour("path", new MissilePath(bullet, {angle: Math.PI/2}));
      bullets.push(bullet);

    }
    return bullets;
  }
}
