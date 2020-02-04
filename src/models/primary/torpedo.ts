/* A straight shot that has an explosion on impact */

import { Bullet } from '../bullet';
import { C, CT } from '../../constants';
import { GameState } from '../GameState';
import { Entity } from '../entity';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';
import { ExplodeBehaviour } from '../../behaviours/bullet/ExplodeBehaviour';

export class Torpedo {

  damage:number;
  speed:number;
  range:number;
  radius:number;
  fire_rate:number;
  bullet_count:number;
  bullet_offset:number;
  blast_radius:number;

  constructor(entity, options) {
    this.damage = entity.getDamage() * options.damage;
    this.speed =  options.speed;
    this.range = entity.getRange() * options.range;
    this.radius = options.radius;
    this.fire_rate = entity.getFireRate() * options.fire_rate;
    this.bullet_count = options.bullet_count;
    this.bullet_offset = options.bullet_offset;
    this.blast_radius = options.blast_radius;
  }

  getBullets(x, y):Bullet[] {
    let bullets:Bullet[] = [];
    let options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      collision_type: CT.CIRCLE,
      radius: this.radius,
      bullet_mesh: 4,
      x: x,
      y: y,
      bullet_type: C.SHIP_BULLET,
      explodes: true
    }

    let offset_start = 0;
    if(this.bullet_offset != 0) {
      offset_start = -(this.bullet_count * this.bullet_offset) / 2;
    }

    for(var i = 0; i < this.bullet_count; i++){
      let bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offset_start + (i * this.bullet_offset);
      bullet.registerBehaviour(new StraightLineUpPath(bullet));
      bullet.registerBehaviour(new ExplodeBehaviour(bullet, {blast_radius: this.blast_radius}));
      bullets.push(bullet);
    }

    return bullets;
  }
}
