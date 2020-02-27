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
      offset_start = 10 - ((this.bullet_count * this.bullet_offset) / 2);
    }

    for(var i = 0; i < this.bullet_count; i++){
      let bullet = new Bullet(options);
      bullet.position.x = bullet.position.x + offset_start + (i * this.bullet_offset);
      bullet.registerBehaviour(new StraightLineUpPath(bullet));
      bullets.push(bullet);
    }

    return bullets;
  }
}
