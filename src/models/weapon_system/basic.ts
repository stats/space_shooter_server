/* Basic bullet */

/* This is also the mechanism for firing the bullet */

import { Bullet } from '../bullet';
import { C } from '../../constants';
import { GameState } from '../GameState';
import { Entity } from '../entity';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';

export class Basic {

  damage:number;
  speed:number;
  range:number;

  constructor(options) {
    this.damage = options.damage;
    this.speed = options.speed;
    this.range = options.range;
  }

  getBullet() {
    let options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      bullet_mesh: 0,
      behaviours: [StraightLineUpPath],
      bullet_type: C.SHIP_BULLET
    }
    return new Bullet(options);
  }
}
