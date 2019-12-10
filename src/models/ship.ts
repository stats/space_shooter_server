import { Schema, type } from "@colyseus/schema";
import { InputBehaviour } from '../behaviours/player/InputBehaviour';
import { CollidesWithEnemy } from '../behaviours/player/CollidesWithEnemy';
import { CollidesWithEnemyBullet } from '../behaviours/player/CollidesWithEnemyBullet';
import { DestroyedBehaviour } from '../behaviours/player/DestroyedBehaviour';
import { TakesDamageBehaviour } from '../behaviours/player/TakesDamageBehaviour';
import { PrimaryAttackBehaviour } from '../behaviours/player/PrimaryAttackBehaviour';
import { SpecialAttackBehaviour } from '../behaviours/player/SpecialAttackBehaviour';
import { ShieldRechargeBehaviour } from '../behaviours/player/ShieldRechargeBehaviour';

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
  primary_attack:number = 0;

  @type("number")
  primary_cooldown_max:number = 0;

  @type("number")
  primary_cooldown:number = 0;

  @type("int32")
  special_attack:number = 0;

  @type("number")
  special_cooldown_max:number = 0;

  @type("number")
  special_cooldown:number = 0;

  @type("number")
  kills:number = 0;

  @type("number")
  kill_score:number = 0;

  @type("number")
  current_kills:number = 0;

  @type("int32")
  shields:number = 1;

  @type("int32")
  max_shields:number = 1; //TODO: Be the upgrade value

  @type("number")
  shields_recharge_cooldown:number = 0;

  @type("number")
  shields_recharge_time:number = 30000;

  @type("number")
  speed:number = 100; //TODO: Be the upgrade value

  @type("number")
  accelleration:number = 5; //TODO: Be the upgrade value

  @type("number")
  horizontal_accelleration:number = 0;

  @type("number")
  vertical_accelleration:number = 0;

  @type("number")
  rank:number = 1; //The current ranking of the ship which corresponds to which wave to start on

  @type("number")
  level:number = 1;

  @type("number")
  next_level:number = 0;

  radius:number;

  createdAt:number;

  inGame:number;

  //upgrades
  @type("int32")
  upgrade_points:number = 0;

  @type("int32")
  upgrade_weapon_damage:number = 0;

  @type("int32")
  upgrade_weapon_range:number = 0;

  @type("int32")
  upgrade_weapon_fire_rate:number = 0;

  @type("int32")
  upgrade_accelleration:number = 0;

  @type("int32")
  upgrade_speed:number = 0;

  @type("int32")
  upgrade_shields_max:number = 0;

  @type("int32")
  upgrade_shields_recharge:number = 0;

  getDamage() {
    return 1 + this.upgrade_weapon_damage;
  }

  getRange() {
    return 0 + (this.upgrade_weapon_range * 25)
  }

  getFireRate() {
    return 0 + (this.upgrade_weapon_fire_rate * 250);
  }

  getMaxShields() {
    return 1 + (this.upgrade_shields_max);
  }

  getShieldRecharge() {
    return 0 + (this.upgrade_shields_recharge * 50);
  }

  getSpeed() {
    return 50 + (this.upgrade_speed * 50);
  }

  getAccelleration() {
    return 50 + (this.upgrade_accelleration * 50);
  }

  constructor(opts) {
    super(opts);
    merge(this, opts);
    this.radius= 27;
    this.bullet_offset_y = 30;
    this.updateNextLevel();
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviours([
      new InputBehaviour(this),
      new CollidesWithEnemy(this),
      new CollidesWithEnemyBullet(this),
      new DestroyedBehaviour(this),
      new TakesDamageBehaviour(this),
      new ShieldRechargeBehaviour(this),
      new PrimaryAttackBehaviour(this),
      new SpecialAttackBehaviour(this)
    ]);
    this.shields = this.max_shields = this.getMaxShields();
    this.speed = this.getSpeed();
    this.accelleration = this.getAccelleration();
    this.shields_recharge_time = 30000 - (20000 * (this.upgrade_shields_recharge / 20));
    this.updateNextLevel();
  }

  checkLevelUp() {
    while( this.kills > this.next_level ) {
      this.level += 1;
      this.upgrade_points += 1;
      this.updateNextLevel();
    }
  }

  updateNextLevel() {
    this.next_level = Math.floor(50*Math.pow(this.level, 1.25))
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
      'ranks',
      'level',
      'next_level',
      'diameter',
      'width',
      'height',
      'inGame',
      'kills',
      'kill_score',
      'upgrade_points',
      'upgrade_weapon_damage',
      'upgrade_weapon_range',
      'upgrade_weapon_fire_rate',
      'upgrade_speed',
      'upgrade_accelleration',
      'upgrade_shields_max',
      'upgrade_shields_recharge',
      'createdAt'
    ]);
    return baseObj;
  }
}
