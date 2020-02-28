import { Schema, type } from "@colyseus/schema";
import { InputBehaviour } from '../behaviours/player/InputBehaviour';
import { CollidesWithEnemy } from '../behaviours/player/CollidesWithEnemy';
import { CollidesWithEnemyBullet } from '../behaviours/player/CollidesWithEnemyBullet';
import { DestroyedBehaviour } from '../behaviours/player/DestroyedBehaviour';
import { TakesDamageBehaviour } from '../behaviours/player/TakesDamageBehaviour';
import { PrimaryAttackBehaviour } from '../behaviours/player/PrimaryAttackBehaviour';
import { SpecialAttackBehaviour } from '../behaviours/player/SpecialAttackBehaviour';
import { ShieldRechargeBehaviour } from '../behaviours/player/ShieldRechargeBehaviour';

import { C } from '../Constants';

import { AccountHelper } from '../helpers/AccountHelper';

import { GameState } from './GameState';

import { Entity } from './Entity';

import { pick, merge } from 'lodash';

const uuid = require('uuid/v4');

export class Ship extends Entity {

  sessionId?: number;
  connected = false;

  @type("string")
  name: string;

  username: string;
  uuid: string;

  @type("string")
  ship_type: string;

  @type("string")
  ship_material: string;

  @type("string")
  primary_weapon: string;

  @type("string")
  special_weapon: string;

  @type("number")
  primaryCooldownMax = 0;

  @type("number")
  primaryCooldown = 0;

  @type("number")
  specialCooldownMax = 0;

  @type("number")
  specialCooldown = 0;

  @type("number")
  kills = 0;

  @type("number")
  killScore = 0;

  @type("number")
  currentKills = 0;

  @type("int32")
  shields = 1;

  @type("number")
  damage = 1;

  @type("number")
  fireRate = 1;

  @type("number")
  range = 1;

  @type("int32")
  maxShields = 1; //TODO: Be the upgrade value

  @type("number")
  shieldsRechargeCooldown = 0;

  @type("number")
  shieldsRechargeTime = 30000;

  @type("number")
  speed = 0;

  @type("number")
  accelleration = 0;

  horizontalAccelleration = 0;
  verticalAccelleration = 0;

  @type("number")
  rank = 1; //The current ranking of the ship which corresponds to which wave to start on

  @type("number")
  highestWave = 1;

  @type("number")
  level = 1;

  @type("number")
  previousLevel = 0;

  @type("number")
  nextLevel = 0;

  createdAt: number;

  weaponCharge = 1;
  thrusters = 1;

  inGame: number;

  //upgrades
  @type("int32")
  upgradePoints = 0;

  @type("int32")
  upgrade_damage = 0;

  @type("int32")
  upgrade_range = 0;

  @type("int32")
  upgrade_fireRate = 0;

  @type("int32")
  upgrade_accelleration = 0;

  @type("int32")
  upgrade_speed = 0;

  @type("int32")
  upgrade_shields_max = 0;

  @type("int32")
  upgrade_shields_recharge = 0;

  damage_base = 1;
  damage_growth = 1;

  range_base = 0;
  range_growth = 25;

  fireRate_base = 0;
  fireRate_growth = 250;

  speedBase = 100;
  speedGrowth = 50;

  accelleration_base = 100;
  accelleration_growth = 50;

  shields_base = 1;
  shields_growth = 1;

  shield_recharge_base = 30000;
  shield_recharge_growth = 750;

  tracker: any = {};

  getDamage() {
    return ( this.damage_base + (this.upgrade_damage * this.damage_growth) ) * this.weaponCharge;
  }

  getRange() {
    return this.range_base + (this.upgrade_range * this.range_growth)
  }

  getFireRate() {
    return this.fireRate_base - (this.upgrade_fireRate * this.fireRate_growth);
  }

  getMaxShields() {
    return this.shields_base + (this.upgrade_shields_max * this.shields_growth);
  }

  getShieldRecharge() {
    return this.shield_recharge_base - (this.upgrade_shields_recharge * this.shield_recharge_growth);
  }

  getSpeed() {
    return this.speedBase + (this.upgrade_speed * this.speedGrowth) * this.thrusters;
  }

  getAccelleration() {
    return this.accelleration_base + (this.upgrade_accelleration * this.accelleration_growth) * this.thrusters;
  }

  async updateWaveRank(wave: number) {
    if(wave > this.highestWave) {
      this.highestWave = wave;
    }
    if( wave > this.rank ) {
      this.rank += Math.round((wave - this.rank) / 2);
    } else if ( wave < this.rank) {
      this.rank -= Math.ceil((this.rank - wave) / 4);
    }
    this.rank = Math.max(this.rank, 1);
    console.log("[Ship] (username)", this.username);
    const account = await AccountHelper.getAccountByUsername(this.username);
    /** This could fail **/
    if(account) {
      account.updateStatsWithShip(this);
      await AccountHelper.saveAccount(account);
    } else {
      console.log("[Ship] Get AccountByUsername FAILED");
    }
  }

  constructor(opts) {
    super(opts);
    merge(this, opts);
    if(!this.tracker) this.tracker = opts.tracker || {};
    if(this.uuid == null) this.uuid = uuid();
    this.radius = 27;
    this.bulletOffsetY = 50;
    this.setupShip();
  }

  setupShip() {
    this.damage = this.getDamage();
    this.fireRate = this.getFireRate();
    this.range = this.getRange();
    this.shields = this.maxShields = this.getMaxShields();
    this.speed = this.getSpeed();
    this.accelleration = this.getAccelleration();
    this.shieldsRechargeTime = this.getShieldRecharge();
    this.updateNextLevel();
  }

  onInitGame(state: GameState) {
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

  setWeaponCharge(n: number) {
    this.weaponCharge = n;
    this.damage = this.getDamage();
  }

  setThrusters(n: number) {
    this.thrusters = n;
    this.speed = this.getSpeed();
    this.accelleration = this.getAccelleration();
  }

  checkLevelUp() {
    while( this.kills > this.nextLevel ) {
      this.level += 1;
      this.upgradePoints += 1;
      this.updateNextLevel();
    }
  }

  clampToBounds() {
    if(this.position.x < C.BOUNDS.minX) {
      this.position.x = C.BOUNDS.minX;
      this.horizontalAccelleration = 0;
    }
    if(this.position.x > C.BOUNDS.maxX) {
       this.position.x = C.BOUNDS.maxX;
       this.horizontalAccelleration = 0;
    }
    if(this.position.y < C.BOUNDS.minY) {
       this.position.y = C.BOUNDS.minY;
       this.verticalAccelleration = 0;
    }
    if(this.position.y > C.BOUNDS.maxY) {
       this.position.y = C.BOUNDS.maxY;
       this.verticalAccelleration = 0;
    }
  }

  addKill(currentWave, modelType) {
    this.currentKills += 1;
    this.kills += 1;
    this.killScore += currentWave;
    this.$state.enemies_killed++;
    if( !(modelType in this.tracker) ) this.tracker[modelType] = 1;
    else this.tracker[modelType] += 1;
    this.checkLevelUp();
  }

  updateNextLevel() {
    this.previousLevel = Math.floor(50*Math.pow(this.level-1, 1.25));
    this.nextLevel = Math.floor(50*Math.pow(this.level, 1.25));
  }

  toSaveObject(): any {
    const baseObj: any = pick(this, [
      'name',
      'uuid',
      'username',
      'ship_type',
      'ship_material',
      'primary_weapon',
      'special_weapon',
      'kills',
      'killScore',
      'rank',
      'highestWave',
      'level',
      'radius',
      'createdAt',
      'upgradePoints',
      'upgrade_damage',
      'upgrade_range',
      'upgrade_fireRate',
      'upgrade_accelleration',
      'upgrade_speed',
      'upgrade_shields_max',
      'upgrade_shields_recharge',
      'damage_base',
      'damage_growth',
      'range_base',
      'range_growth',
      'fireRate_base',
      'fireRate_growth',
      'speedBase',
      'speedGrowth',
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
