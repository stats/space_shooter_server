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

  @type("number")
  body_type:number;

  @type("number")
  wing_visual:number;

  @type("number")
  engine_visual:number;

  @type("number")
  weapons_visual:number;

  @type("number")
  texture_visual:number;

  @type("number")
  primary_attack:number;

  @type("number")
  special_attack:number;

  @type("number")
  shield_type:number;

  @type("number")
  hull_type:number;

  @type("number")
  engine_type:number;

  @type("number")
  weapon_type:number;

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