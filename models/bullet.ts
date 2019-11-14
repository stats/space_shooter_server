import { Schema, type } from "@colyseus/schema";

import { Entity } from './entity';

export class Bullet extends Entity {

  bullet_type:number;
  damage:number;

  constructor(options) {
    super(options);
    //TODO: Double check that bullet_type actually gets set by the super call
  }

  destroy() {
    this.$state.removeBullet(this);
  }

}
