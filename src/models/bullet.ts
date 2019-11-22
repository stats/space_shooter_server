import { Schema, type } from "@colyseus/schema";

import { Entity } from './entity';

import { merge } from 'lodash';

export class Bullet extends Entity {

  /* An enemy bullet or a ship bullet. This determines which collision to check */
  bullet_type:number;

  /* The damage done by this bullet */
  damage:number;

  /* The speed the bullet travels */
  speed:number;

  /* The distance the bullet will travel */
  range:number;

  /* The mesh to display for the bullet */
  @type("int32")
  bullet_mesh:number;

  /* The material to color the bullet with */
  @type("int32")
  bullet_mat:number;

  constructor(options) {
    super(options);
    merge(this, options);
  }
}
