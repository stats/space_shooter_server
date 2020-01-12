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

import { SHIPS } from '../constants';

export class Ship extends Entity {

  sessionId?:number;
  connected:boolean = false;

  @type("string")
  name:string;

  username:string;

  @type("string")
  ship_type:string;

  @type("string")
  ship_material:string;

  @type("string")
  primary_weapon:string;

  @type("string")
  special_weapon:string;

  @type("number")
  primary_cooldown_max:number = 0;

  @type("number")
  primary_cooldown:number = 0;

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
  speed:number = 0;

  @type("number")
  accelleration:number = 0;

  @type("number")
  rank:number = 1; //The current ranking of the ship which corresponds to which wave to start on

  @type("number")
  highest_wave:number = 1;

  @type("number")
  level:number = 1;

  @type("number")
  previous_level:number = 0;

  @type("number")
  next_level:number = 0;

  radius:number;

  createdAt:number;

  inGame:number;

  //upgrades
  @type("int32")
  upgrade_points:number = 0;

  @type("int32")
  upgrade_damage:number = 0;

  @type("int32")
  upgrade_range:number = 0;

  @type("int32")
  upgrade_fire_rate:number = 0;

  @type("int32")
  upgrade_accelleration:number = 0;

  @type("int32")
  upgrade_speed:number = 0;

  @type("int32")
  upgrade_shields_max:number = 0;

  @type("int32")
  upgrade_shields_recharge:number = 0;

  getDamage() {
    return SHIPS.DAMAGE_BASE + (this.upgrade_damage * SHIPS.DAMAGE_GROWTH);
  }

  getRange() {
    return SHIPS.RANGE_BASE + (this.upgrade_range * SHIP.RANGE_GROWTH)
  }

  getFireRate() {
    return SHIPS.FIRE_RATE_BASE + (this.upgrade_fire_rate * SHIPS.FIRE_RATE_GROWTH);
  }

  getMaxShields() {
    return SHIPS.SHIELDS_BASE + (this.upgrade_shields_max * SHIPS.SHIELDS_GROWTH);
  }

  getShieldRecharge() {
    return SHIPS.SHIELD_RECHARGE_BASE - (this.upgrade_shields_recharge * SHIPS.SHIELD_RECHARGE_GROWTH);
  }

  getSpeed() {
    return SHIPS.SPEED_BASE + (this.upgrade_speed * SHIPS.SPEED_GROWTH);
  }

  getAccelleration() {
    return SHIPS.ACCELLERATION_BASE + (this.upgrade_accelleration * SHIPS.ACCELLERATION_GROWTH);
  }

  updateWaveRank(wave:number) {
    if(wave > this.highest_wave) {
      this.highest_wave = wave;
    }
    if( wave > this.rank ) {
      this.rank += Math.round((wave - this.rank) / 2);
    } else if ( wave < this.rank) {
      this.rank -= Math.ceil((this.rank - wave) / 4);
    }
    this.rank = Math.max(this.rank, 1);
  }


  constructor(opts) {
    super(opts);
    merge(this, opts);
    this.radius= 27;
    this.bullet_offset_y = 50;
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
    this.shields_recharge_time = this.getShieldRecharge();
    this.updateNextLevel();
  }

  checkLevelUp() {
    while( this.kills > this.next_level ) {
      this.level += 1;
      this.upgrade_points += 1;
      this.updateNextLevel();
    }
  }

  addKill(current_wave) {
    this.current_kills += 1;
    this.kills += 1;
    this.kill_score += current_wave;
    this.$state.enemies_killed++;
    this.checkLevelUp();
  }

  updateNextLevel() {
    this.previous_level = Math.floor(50*Math.pow(this.level-1, 1.25));
    this.next_level = Math.floor(50*Math.pow(this.level, 1.25));
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
      'special_mesh',
      'special_mat',
      'max_shields',
      'speed',
      'accelleration',
      'rank',
      'highest_wave',
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
