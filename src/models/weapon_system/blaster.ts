import { Bullet } from '../bullet';
import { C, CT } from '../../constants';
import { GameState } from '../GameState';
import { Entity } from '../entity';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';

export class Blaster {

  damage:number;
  speed:number;
  range:number;
  radius:number;
  fire_rate:number;

  constructor(options) {
    this.damage = options.damage + options.entity.upgrade_weapon_damage;
    this.speed = options.speed;
    this.range = options.range + (options.entity.upgrade_weapon_range * 20);
    this.radius = options.radius;
    this.fire_rate = options.fire_rate - (options.fire_rate * 0.75 * (options.entity.upgrade_weapon_fire_rate / 20));
  }

  getBullet(x, y) {
    let options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      collision_type: CT.CIRCLE,
      radius: this.radius,
      bullet_mesh: 1,
      x: x,
      y: y,
      behaviours: [StraightLineUpPath],
      bullet_type: C.SHIP_BULLET
    }
    return new Bullet(options);
  }
}
