import { Schema, type } from "@colyseus/schema";
import { KeyboardMovementBehaviour } from '../behaviours/player/KeyboardMovementBehaviour';
import { CollidesWithEnemy } from '../behaviours/player/CollidesWithEnemy';
import { CollidesWithEnemyBullet } from '../behaviours/player/CollidesWithEnemyBullet';

import { GameState } from './GameState';

import { Entity } from './entity';

import { pick } from 'lodash';

export class Ship extends Entity {

  sessionId?:number;
  connected:boolean = false;

  @type("string")
  name:string;

  username:string;

  @type("int32")
  body_mesh:number;

  @type("int32")
  body_mat:number;

  @type("int32")
  wing_mesh:number;

  @type("int32")
  wing_mat:number;

  @type("int32")
  engine_mesh:number;

  @type("int32")
  engine_mat:number;

  @type("int32")
  weapon_mesh:number;

  @type("int32")
  weapon_mat:number;

  @type("int32")
  primary_attack:number;

  @type("int32")
  special_attack:number;

  @type("int32")
  shields:number;

  @type("int32")
  max_shields:number;

  @type("number")
  speed:number;

  @type("number")
  accelleration:number;

  @type("number")
  weapon_power:number

  @type("number")
  rank:number; //The current ranking of the ship which corresponds to which wave to start on

  radius:number;

  createdAt:number;

  inGame:number;

  constructor(opts) {
    super(opts);
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviour(new KeyboardMovementBehaviour(this));
    this.registerBehaviour(new CollidesWithEnemy(this, this.$state));
    this.registerBehaviour(new CollidesWithEnemyBullet(this, this.$state));
  }

  toSaveObject():any {
    const baseObj:any = pick(this, [
      'username', 'name', 'uuid', 'body_type', 'wing_type', 'engine_type', 'weapon_type', 'ranks', 'diameter', 'width', 'height', 'inGame', 'createdAt'
    ]);
    return baseObj;
  }

}
