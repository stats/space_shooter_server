/* Basic bullet */

/* This is also the mechanism for firing the bullet */

import { Bullet } from '../Bullet';
import { C, CT } from '../../Constants';
import { StraightLineUpPath } from '../../behaviours/Bullet/StraightLineUpPath';
import { StraightAnglePath } from '../../behaviours/Bullet/StraightAnglePath';
import { Primary } from './Primary';

export class Cannon extends Primary {

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

    if(this.bullet_count == 1){
      let bullet = new Bullet(options);
      bullet.registerBehaviour(new StraightLineUpPath(bullet));
      bullets.push( bullet );
    } else if (this.bullet_count == 2){
      let bullet = new Bullet(options);
      bullet.registerBehaviour(new StraightAnglePath(bullet, {angle: Math.PI/2 - this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.registerBehaviour(new StraightAnglePath(bullet, {angle: Math.PI/2 + this.bullet_angle}));
      bullets.push(bullet);
    } else if (this.bullet_count == 3){

      let bullet = new Bullet(options);
      bullet.registerBehaviour(new StraightAnglePath(bullet, {angle: Math.PI/2 -this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.registerBehaviour(new StraightAnglePath(bullet, {angle: Math.PI/2 +this.bullet_angle}));
      bullets.push(bullet);

      bullet = new Bullet(options);
      bullet.registerBehaviour(new StraightLineUpPath(bullet));
      bullets.push(bullet);

    }

    return bullets;
  }
}
