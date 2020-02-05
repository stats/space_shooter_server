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

  /* The angle for the bullet to travel */
  angle:number;

  /* Tracks who fired this entity */
  fired_by:Entity;

  /** If there is a splash effect **/
  explodes:boolean = false;

  /* The mesh to display for the bullet */
  @type("string")
  bullet_mesh:string;

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
