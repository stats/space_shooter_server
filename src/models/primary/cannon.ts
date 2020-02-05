/* Basic bullet */

/* This is also the mechanism for firing the bullet */

import { Bullet } from '../bullet';
import { C, CT } from '../../constants';
import { GameState } from '../GameState';
import { Entity } from '../entity';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';
import { StraightAnglePath } from '../../behaviours/bullet/StraightAnglePath';
import { Primary } from './Primary';

export class Cannon extends Primary {

  constructor(entity, options) {
    super(entity, options);
    this.bullet_mesh = "Cannon";
  }

  getBullets(x, y):Bullet[] {
    let bullets:Bullet[] = [];
    let options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      collision_type: CT.CIRCLE,
      radius: this.radius,
      bullet_mesh: this.bullet_mesh,
      x: x,
      y: y,
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
