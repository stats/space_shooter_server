/* Basic bullet */

/* This is also the mechanism for firing the bullet */

import { Bullet } from '../bullet';
import { C, CT } from '../../constants';
import { GameState } from '../GameState';
import { Entity } from '../entity';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';
import { StraightAnglePath } from '../../behaviours/bullet/StraightAnglePath';

export class Cannon {

  damage:number;
  speed:number;
  range:number;
  radius:number;
  fire_rate:number;
  bullet_count:number;
  bullet_angle:number;
  bullet_offset:number;

  constructor(entity, options) {
    this.damage = entity.getDamage() * options.damage;
    this.speed =  options.speed;
    this.range = entity.getRange() * options.range;
    this.radius = options.radius;
    this.fire_rate = entity.getFireRate() * options.fire_rate;
    this.bullet_count = options.bullet_count;
    this.bullet_angle = options.bullet_angle;
    this.bullet_offset = options.bullet_offset;
  }

  getBullets(x, y):Bullet[] {
    let bullets:Bullet[] = [];
    let options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      collision_type: CT.CIRCLE,
      radius: this.radius,
      bullet_mesh: 0,
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
