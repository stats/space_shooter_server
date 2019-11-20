/* Basic bullet */

/* This is also the mechanism for firing the bullet */

import { Bullet } from '../bullet';
import { C } from '../../constants';
import { GameState } from '../GameState';
import { Entity } from '../entity';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';

export class Basic {

  public static LEVELS = [
    {
      damage: 1,
      range: 200,
      speed: 1,
      firerate: 1000,
    }
  ];

  damage:number;
  speed:number;
  range:number;

  /* Milliseconds between firing */
  fire_rate:number;

  cooldown:number = 0;

  parent:Entity;

  state:GameState;

  constructor(options) {
    if(!options.level) options["level"] = 0;
    this.parent = options.parent;
    this.state = options.state;
    this.damage = Basic.LEVELS[options.level].damage;
    this.speed = Basic.LEVELS[options.level].speed;
    this.range = Basic.LEVELS[options.level].range;
    this.firerate = Basic.LEVELS[options.level].firerate;
  }

  fire() {
    if(!this.canFire()) return;
    this.cooldown = 0;
    let spawn_location = this.parent.getBulletSpawnLocation();
    let options = {
      damage: this.damage,
      speed: this.speed,
      range: this.range,
      behaviour: StraignLineUpPath,
      bullet_type: C.SHIP_BULLET,
      x: spawn_location.x,
      y: spawn_location.y
    }
    this.state.addBullet(new Bullet(options));
  }

  update(deltaTime):void {
    if(this.cooldown < this.fire_rate) {
      this.cooldown += deltaTime
    }
  }

  canFire():bool {
    return this.cooldown >= this.fire_rate;
  }

}
