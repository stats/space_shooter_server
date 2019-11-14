import { Schema, type } from "@colyseus/schema";

import { Entity } from './entity';

export class Bullet extends Entity {

  bullet_type:number;
  damage:number;

  constructor(bullet_type:number) {
    this.bullet_type = bullet_type;
  }

  destroy() {
    this.$room.removeBullet(this);
  }

}
