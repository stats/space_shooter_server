/* A straight shot that has an explosion on impact */

import { Bullet, C, CT, Entity, BulletStraightAnglePath, ExplodeBehaviour, Primary, Position } from '../../Internal';

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
      bullet.registerBehaviour("path", new BulletStraightLineUpPath(bullet));
      bullet.registerBehaviour("explode", new BulletExplodeBehaviour(bullet));
      bullets.push(bullet);
    }

    return bullets;
  }
}
