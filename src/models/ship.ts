import { Schema, type } from "@colyseus/schema";
import { InputBehaviour } from '../behaviours/player/InputBehaviour';
import { CollidesWithEnemy } from '../behaviours/player/CollidesWithEnemy';
import { CollidesWithEnemyBullet } from '../behaviours/player/CollidesWithEnemyBullet';
import { DestroyedBehaviour } from '../behaviours/player/DestroyedBehaviour';
import { TakesDamageBehaviour } from '../behaviours/player/TakesDamageBehaviour';
import { PrimaryAttackBehaviour } from '../behaviours/player/PrimaryAttackBehaviour';
import { SpecialAttackBehaviour } from '../behaviours/player/SpecialAttackBehaviour';

import { GameState } from './GameState';

import { Entity } from './entity';

import { pick, merge } from 'lodash';

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

  @type("number")
  primary_cooldown_max:number;

  @type("number")
  primary_cooldown:number;

  @type("int32")
  special_attack:number;

  @type("number")
  special_cooldown_max:number;

  @type("number")
  special_cooldown:number;

  @type("number")
  kills:number = 0;

  @type("number")
  kill_score:number = 0;

  @type("number")
  current_kills:number = 0;

  @type("int32")
  shields:number;

  @type("int32")
  max_shields:number;

  @type("number")
  speed:number = 100;

  @type("number")
  accelleration:number = 5;

  @type("number")
  horizontal_accelleration:number = 0;

  @type("number")
  vertical_accelleration:number = 0;

  @type("number")
  weapon_power:number

  @type("number")
  rank:number; //The current ranking of the ship which corresponds to which wave to start on

  radius:number;

  createdAt:number;

  inGame:number;

  constructor(opts) {
    super(opts);
    merge(this, opts);
    this.radius= 27;
    this.bullet_offset_y = 30;
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviours([
      new InputBehaviour(this),
      new CollidesWithEnemy(this),
      new CollidesWithEnemyBullet(this),
      new DestroyedBehaviour(this),
      new TakesDamageBehaviour(this),
      new PrimaryAttackBehaviour(this),
      new SpecialAttackBehaviour(this)
    ]);
    this.shields = this.max_shields;
  }

  toSaveObject():any {
    const baseObj:any = pick(this, [
      'username',
      'name',
      'uuid',
      'body_mesh',
      'body_mat',
      'wing_mesh',
      'wing_mat',
      'engine_mesh',
      'engine_mat',
      'weapon_mesh',
      'weapon_mat',
      'primary_attack',
      'special_attack',
      'max_shields',
      'speed',
      'accelleration',
      'weapon_power',
      'ranks',
      'diameter',
      'width',
      'height',
      'inGame',
      'kills',
      'createdAt'
    ]);
    return baseObj;
  }
}
