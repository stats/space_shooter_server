/* A straight shot that has an explosion on impact */

import { Bullet } from '../bullet';
import { C, CT } from '../../constants';
import { GameState } from '../GameState';
import { Entity } from '../entity';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';
import { ExplodeBehaviour } from '../../behaviours/bullet/ExplodeBehaviour';
import { Primary } from './Primary';

export class Torpedo extends Primary {

  constructor(entity, options) {
    super(entity, options);
    this.bullet_mesh = "Torpedo";
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
