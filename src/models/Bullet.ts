import { type } from "@colyseus/schema";

import { Entity } from './Entity';

import { merge } from 'lodash';

import { DestroyedBehaviour } from '../behaviours/Bullet/DestroyedBehaviour';

import { CT } from '../Constants';

export class Bullet extends Entity {

  /* An enemy bullet or a ship bullet. This determines which collision to check */
  bulletType: number;

  /* The damage done by this bullet */
  damage: number;

  /* The speed the bullet travels */
  speed: number;

  /* The distance the bullet will travel */
  range: number;

  /* The angle for the bullet to travel */
  angle: number;

  /* Tracks who fired this entity */
  firedBy: Entity;

  /** If there is a splash effect **/
  explodes = false;

  @type("number")
  blastRadius = 0;

  /* The mesh to display for the bullet */
  @type("string")
  bulletMesh: string;

  collision_tpe = CT.CIRCLE;
  radius = 15;

  constructor(options:any) {
    super(options);
    merge(this, options);
    this.registerBehaviour("destroyed", new DestroyedBehaviour(this));

  }
}
