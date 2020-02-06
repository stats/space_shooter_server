import { Bullet } from '../bullet';
import { C, CT } from '../../constants';
import { Entity } from '../entity';
import { MissilePath } from '../../behaviours/bullet/MissilePath';
import { Primary } from './Primary';

export class Missile extends Primary {

  constructor(entity, options) {
    super(entity, options);
  }

  getBullets():Bullet[] {
    let spawn_location = this.entity.getBulletSpawnLocation();

    let bullets:Bullet[] = [];
    let options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      collision_type: CT.CIRCLE,
      radius: this.radius,
      bullet_mesh: this.bullet_mesh,
      x: spawn_location.x,
      y: spawn_location.y,
      bullet_type: C.SHIP_BULLET
    }

    let offset_start = 0;
    if(this.bullet_offset != 0) {
      offset_start = -(this.bullet_count * this.bullet_offset) / 2;
    }
    let bullet;
    if(this.bullet_count == 1){
      bullet = new Bullet(options);
      bullet.registerBehaviour(new MissilePath(bullet, {angle: Math.PI/2}));
      bullets.push( bullet );
    } else if (this.bullet_count == 2){
      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offset_start;
      bullet.registerBehaviour(new MissilePath(bullet, {angle: Math.PI/2 - this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offset_start + this.bullet_offset;
      bullet.registerBehaviour(new MissilePath(bullet, {angle: Math.PI/2 + this.bullet_angle}));
      bullets.push(bullet);
    } else if (this.bullet_count == 3){
      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offset_start;
      bullet.registerBehaviour(new MissilePath(bullet, {angle: Math.PI/2 -this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offset_start + this.bullet_offset;
      bullet.registerBehaviour(new MissilePath(bullet, {angle: Math.PI/2 +this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offset_start + (2 * this.bullet_offset);
      bullet.registerBehaviour(new MissilePath(bullet, {angle: Math.PI/2}));
      bullets.push(bullet);

    }
    return bullets;
  }
}
