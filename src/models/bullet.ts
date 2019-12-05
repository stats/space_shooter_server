import { Schema, type } from "@colyseus/schema";

import { Entity } from './entity';

import { merge } from 'lodash';

import { DestroyedBehaviour } from '../behaviours/bullet/DestroyedBehaviour';

import { CT } from '../constants';

export class Bullet extends Entity {

  /* An enemy bullet or a ship bullet. This determines which collision to check */
  bullet_type:number;

  /* The damage done by this bullet */
  damage:number;

  /* The speed the bullet travels */
  speed:number;

  /* The distance the bullet will travel */
  range:number;

  /* Tracks who fired this entity */
  fired_by:Entity;

  /* The mesh to display for the bullet */
  @type("int32")
  bullet_mesh:number;

  /* The material to color the bullet with */
  @type("int32")
  bullet_mat:number;

  collision_tpe = CT.CIRCLE;
  radius:number = 15;

  constructor(options) {
    super(options);
    merge(this, options);
    this.registerBehaviours([
      new DestroyedBehaviour(this)
    ]);
    if(options.behaviours) {
      for(let behaviour of options.behaviours) {
        this.registerBehaviour(new behaviour(this))
      }
    }
  }
}
