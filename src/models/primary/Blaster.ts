import { Bullet } from '../Bullet';
import { C, CT } from '../../Constants';
import { GameState } from '../GameState';
import { Entity } from '../Entity';
import { StraightLineUpPath } from '../../behaviours/Bullet/StraightLineUpPath';
import { Primary } from './Primary';

export class Blaster extends Primary{

  constructor(entity, options) {
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

    let offsetStart = 0;
    if(this.bullet_offset != 0) {
      offsetStart = 10 - ((this.bullet_count * this.bullet_offset) / 2);
    }

    for(let i = 0; i < this.bullet_count; i++){
      const bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offsetStart + (i * this.bullet_offset);
      bullet.registerBehaviour(new StraightLineUpPath(bullet));
      bullets.push(bullet);
    }

    return bullets;
  }
}
