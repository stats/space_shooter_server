import { Schema, type } from "@colyseus/schema";
import { InputBehaviour } from '../behaviours/player/InputBehaviour';
import { CollidesWithEnemy } from '../behaviours/player/CollidesWithEnemy';
import { CollidesWithEnemyBullet } from '../behaviours/player/CollidesWithEnemyBullet';
import { DestroyedBehaviour } from '../behaviours/player/DestroyedBehaviour';
import { TakesDamageBehaviour } from '../behaviours/player/TakesDamageBehaviour';
import { PrimaryAttackBehaviour } from '../behaviours/player/PrimaryAttackBehaviour';
import { SpecialAttackBehaviour } from '../behaviours/player/SpecialAttackBehaviour';
import { ShieldRechargeBehaviour } from '../behaviours/player/ShieldRechargeBehaviour';

import { C } from '../constants';

import { AccountHelper } from '../helpers/AccountHelper';

import { GameState } from './GameState';

import { Entity } from './entity';

import { pick, merge } from 'lodash';

const uuid = require('uuid/v4');

export class Ship extends Entity {

  sessionId?:number;
  connected:boolean = false;

  @type("string")
  name:string;

  username:string;
  uuid:string;

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

  @type("number")
  damage:number = 1;

  @type("number")
  fire_rate:number = 1;

  @type("number")
  range:number = 1;

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

  horizontal_accelleration:number = 0;
  vertical_accelleration:number = 0;

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

  createdAt:number;

  weaponCharge:number = 1;
  thrusters:number = 1;

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

  damage_base:number = 1;
  damage_growth:number = 1;

  range_base:number = 0;
  range_growth:number = 25;

  fire_rate_base:number = 0;
  fire_rate_growth:number = 250;

  speed_base:number = 100;
  speed_growth:number = 50;

  accelleration_base:number = 100;
  accelleration_growth:number = 50;

  shields_base:number = 1;
  shields_growth:number = 1;

  shield_recharge_base:number = 30000;
  shield_recharge_growth:number = 750;

  tracker:any = {};

  getDamage() {
    return ( this.damage_base + (this.upgrade_damage * this.damage_growth) ) * this.weaponCharge;
  }

  getRange() {
    return this.range_base + (this.upgrade_range * this.range_growth)
  }

  getFireRate() {
    return this.fire_rate_base - (this.upgrade_fire_rate * this.fire_rate_growth);
  }

  getMaxShields() {
    return this.shields_base + (this.upgrade_shields_max * this.shields_growth);
  }

  getShieldRecharge() {
    return this.shield_recharge_base - (this.upgrade_shields_recharge * this.shield_recharge_growth);
  }

  getSpeed() {
    return this.speed_base + (this.upgrade_speed * this.speed_growth) * this.thrusters;
  }

  getAccelleration() {
    return this.accelleration_base + (this.upgrade_accelleration * this.accelleration_growth) * this.thrusters;
  }

  async updateWaveRank(wave:number) {
    if(wave > this.highest_wave) {
      this.highest_wave = wave;
    }
    if( wave > this.rank ) {
      this.rank += Math.round((wave - this.rank) / 2);
    } else if ( wave < this.rank) {
      this.rank -= Math.ceil((this.rank - wave) / 4);
    }
    this.rank = Math.max(this.rank, 1);
    console.log("[Ship] (username)", this.username);
    let account = await AccountHelper.getAccountByUsername(this.username);
    /** This could fail **/
    if(account) {
      account.updateStatsWithShip(this);
    }
    await AccountHelper.saveAccount(account);
  }

  constructor(opts) {
    super(opts);
    merge(this, opts);
    if(!this.tracker) this.tracker = opts.tracker || {};
    if(this.uuid == null) this.uuid = uuid();
    this.radius = 27;
    this.bullet_offset_y = 50;
    this.setupShip();
  }

  setupShip() {
    this.damage = this.getDamage();
    this.fire_rate = this.getFireRate();
    this.range = this.getRange();
    this.shields = this.max_shields = this.getMaxShields();
    this.speed = this.getSpeed();
    this.accelleration = this.getAccelleration();
    this.shields_recharge_time = this.getShieldRecharge();
    this.updateNextLevel();
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.removeAllBehaviours();
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
    this.setupShip()
  }

  setWeaponCharge(n:number) {
    this.weaponCharge = n;
    this.damage = this.getDamage();
  }

  setThrusters(n:number) {
    this.thrusters = n;
    this.speed = this.getSpeed();
    this.accelleration = this.getAccelleration();
  }

  checkLevelUp() {
    while( this.kills > this.next_level ) {
      this.level += 1;
      this.upgrade_points += 1;
      this.updateNextLevel();
    }
  }

  clampToBounds() {
    if(this.position.x < C.BOUNDS.minX) {
      this.position.x = C.BOUNDS.minX;
      this.horizontal_accelleration = 0;
    }
    if(this.position.x > C.BOUNDS.maxX) {
       this.position.x = C.BOUNDS.maxX;
       this.horizontal_accelleration = 0;
    }
    if(this.position.y < C.BOUNDS.minY) {
       this.position.y = C.BOUNDS.minY;
       this.vertical_accelleration = 0;
    }
    if(this.position.y > C.BOUNDS.maxY) {
       this.position.y = C.BOUNDS.maxY;
       this.vertical_accelleration = 0;
    }
  }

  addKill(current_wave, model_type) {
    this.current_kills += 1;
    this.kills += 1;
    this.kill_score += current_wave;
    this.$state.enemies_killed++;
    if( !(model_type in this.tracker) ) this.tracker[model_type] = 1;
    else this.tracker[model_type] += 1;
    this.checkLevelUp();
  }

  updateNextLevel() {
    this.previous_level = Math.floor(50*Math.pow(this.level-1, 1.25));
    this.next_level = Math.floor(50*Math.pow(this.level, 1.25));
  }

  toSaveObject():any {
    const baseObj:any = pick(this, [
      'name',
      'uuid',
      'username',
      'ship_type',
      'ship_material',
      'primary_weapon',
      'special_weapon',
      'kills',
      'kill_score',
      'rank',
      'highest_wave',
      'level',
      'radius',
      'createdAt',
      'upgrade_points',
      'upgrade_damage',
      'upgrade_range',
      'upgrade_fire_rate',
      'upgrade_accelleration',
      'upgrade_speed',
      'upgrade_shields_max',
      'upgrade_shields_recharge',
      'damage_base',
      'damage_growth',
      'range_base',
      'range_growth',
      'fire_rate_base',
      'fire_rate_growth',
      'speed_base',
      'speed_growth',
      'accelleration_base',
      'accelleration_growth',
      'shields_base',
      'shields_growth',
      'shield_recharge_base',
      'shield_recharge_growth',
      'tracker'
    ]);
    return baseObj;
  }
}
