/* Basic bullet */

/* This is also the mechanism for firing the bullet */

import { Bullet } from '../bullet';
import { C, CT } from '../../constants';
import { GameState } from '../GameState';
import { Entity } from '../entity';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';

export class Basic {

  damage:number;
  speed:number;
  range:number;
  radius:number;
  fire_rate:number;

  constructor(options) {
    let entity = options.entity;
    this.damage = entity.getDamage() * options.damage;
    this.speed =  options.speed;
    this.range = entity.getRange() * options.range;
    this.radius = options.radius;
    this.fire_rate = entity.getFireRate() * options.fire_rate;
  }

  getBullet(x, y) {
    let options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      collision_type: CT.CIRCLE,
      radius: this.radius,
      bullet_mesh: 0,
      x: x,
      y: y,
      behaviours: [StraightLineUpPath],
      bullet_type: C.SHIP_BULLET
    }
    return new Bullet(options);
  }
}
