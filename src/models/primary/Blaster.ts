import { Bullet, Entity, C, CT, BulletStraightLineUpPath, Primary } from '../../Internal';

export class Blaster extends Primary{

  constructor(entity: Entity, options: any) {
    super(entity, options);
  }

  getBullets(): Bullet[] {
    const bullets: Bullet[] = [];

    let offsetStart = 0;
    if(this.bulletOffset != 0) {
      offsetStart = 10 - ((this.bulletCount * this.bulletOffset) / 2);
    }

    for(let i = 0; i < this.bulletCount; i++){

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

      const bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offsetStart + (i * this.bulletOffset);
      bullet.registerBehaviour("path", new BulletStraightLineUpPath(bullet));
      bullets.push(bullet);
    }

    return bullets;
  }
}
