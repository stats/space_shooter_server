import { type, ArraySchema } from '@colyseus/schema';
import { InputBehaviour } from '../behaviours/player/InputBehaviour';
import { CollidesWithEnemy } from '../behaviours/player/CollidesWithEnemy';
import { CollidesWithEnemyBullet } from '../behaviours/player/CollidesWithEnemyBullet';
import { DestroyedBehaviour } from '../behaviours/player/DestroyedBehaviour';
import { TakesDamageBehaviour } from '../behaviours/player/TakesDamageBehaviour';
import { PrimaryAttackBehaviour } from '../behaviours/player/PrimaryAttackBehaviour';
import { SpecialAttackBehaviour } from '../behaviours/player/SpecialAttackBehaviour';
import { ShieldRechargeBehaviour } from '../behaviours/player/ShieldRechargeBehaviour';
import { CollectDrop } from '../behaviours/player/CollectDrop';
import { CollidesWithDrop } from '../behaviours/player/CollidesWithDrop';

import { C } from '../Constants';

import { AccountHelper } from '../helpers/AccountHelper';

import { GameState } from './GameState';

import { Entity } from './Entity';

import { pick, merge } from 'lodash';

import { v4 as uuid } from 'uuid';

export class Ship extends Entity {

  sessionId?: number;

  @type("string")
  name: string;

  username: string;
  uuid: string;

  @type("boolean")
  connected: boolean = false;

  @type("boolean")
  justDamaged: boolean = false;

  @type("string")
  shipType: string;

  @type("string")
  shipMaterial: string;

  @type("string")
  primaryWeapon: string;

  @type("string")
  specialWeapon: string;

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
  upgradeDamage = 0;

  @type("int32")
  upgradeRange = 0;

  @type("int32")
  upgradeFireRate = 0;

  @type("int32")
  upgradeAccelleration = 0;

  @type("int32")
  upgradeSpeed = 0;

  @type("int32")
  upgradeShieldsMax = 0;

  @type("int32")
  upgradeShieldsRecharge = 0;

  damageBase = 1;
  damageGrowth = 1;

  rangeBase = 0;
  rangeGrowth = 25;

  fireRateBase = 0;
  fireRateGrowth = 250;

  speedBase = 100;
  speedGrowth = 50;

  accellerationBase = 100;
  accellerationGrowth = 50;

  shieldsBase = 1;
  shieldsGrowth = 1;

  shieldRechargeBase = 30000;
  shieldRechargeGrowth = 750;

  tempDamage = 0;
  tempDamagePercent = 1;
  tempDamageLevel = 0;

  tempRange = 0;
  tempRangePercent = 1;
  tempRangeLevel = 0;

  tempFireRate = 0;
  tempFireRatePercent = 1;
  tempFireRateLevel = 1;

  tempSpeed = 0;
  tempSpeedPercent = 1;
  tempSpeedLevel = 0;

  tempAcceleration = 0;
  tempAccelerationPercent = 1;
  tempAccelerationLevel = 0;

  tempShield = 0;
  tempShieldPercent = 1;
  tempShieldLevel = 0;

  tempShieldRecharge = 0;
  tempShieldRechargePercent = 1;
  tempShieldRechargeLevel = 0;

  tempSpecialCooldown = 0;
  tempSpecialCooldownPercent = 1;
  tempSpecialCooldownLevel = 0;

  tempSpecialDamage = 0;
  tempSpecialDamagePercent = 1;
  tempSpecialDamageLevel = 0;

  type([TempUpgrade])
  tempUpgrades: ArraySchema<TempUpgrade>;

  tracker: any = {};

  getDamage(): number {
    return ( (this.damageBase + this.tempDamage) + ((this.upgradeDamage + this.tempDamageLevel) * this.damageGrowth) ) * this.weaponCharge * this.tempDamagePercent;
  }

  getRange(): number {
    return ((this.rangeBase + this.tempRange) + ( (this.upgradeRange + this.tempRangeLevel)  * this.rangeGrowth)) * this.tempRangePercent;
  }

  getFireRate(): number {
    return ((this.fireRateBase + this.tempFireRate) - ( (this.upgradeFireRate + this.tempFireRateLevel) * this.fireRateGrowth) * this.tempFireRatePercent;
  }

  getMaxShields(): number {
    return ((this.shieldsBase + this.tempShield) + ((this.upgradeShieldsMax + this.tempShieldLevel) * this.shieldsGrowth)) * this.tempShieldPercent;
  }

  getShieldRecharge(): number {
    return ( (this.shieldRechargeBase + this.tempShieldRechange) - ((this.upgradeShieldsRecharge + this.tempShieldRechargeLevel) * this.shieldRechargeGrowth)) * this.tempShieldRechangePercent;
  }

  getSpeed(): number {
    return ((this.speedBase + this.tempSpeed) + ((this.upgradeSpeed + this.tempSpeedLevel) * this.speedGrowth)) * this.thrusters * this.tempSpeedPercent;
  }

  getAccelleration(): number {
    return ( (this.accellerationBase + this.tempAcceleration) + ((this.upgradeAccelleration + this.tempAccelerationLevel) * this.accellerationGrowth)) * this.thrusters * this.tempAccelerationPercent;
  }

  getPrimaryCooldownMax(): number {
    return 1000;
  }

  getSpecialCooldownMax(): number {
    return 1000;
  }


  async updateWaveRank(wave: number): Promise<void> {
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

  constructor(options: any) {
    super(options);
    merge(this, options);
    if(!this.tracker) this.tracker = options.tracker || {};
    if(this.uuid == null) this.uuid = uuid();
    this.radius = 27;
    this.bulletOffsetY = 50;
    this.setupShip();
    this.bulletInvulnerable = false;
    this.collisionInvulnerable = false;
  }

  setupShip(): void {
    this.damage = this.getDamage();
    this.fireRate = this.getFireRate();
    this.range = this.getRange();
    this.shields = this.maxShields = this.getMaxShields();
    this.speed = this.getSpeed();
    this.accelleration = this.getAccelleration();
    this.shieldsRechargeTime = this.getShieldRecharge();
    this.primaryCooldownMax = this.getPrimaryCooldownMax();
    this.specialCooldownMax = this.getSpecialCooldownMax();
    this.updateNextLevel();
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.removeAllBehaviours();
    this.registerBehaviour("input", new InputBehaviour(this));
    this.registerBehaviour("collides_enemy", new CollidesWithEnemy(this));
    this.registerBehaviour("collides_enemy_bullet", new CollidesWithEnemyBullet(this));
    this.registerBehaviour("destroyed", new DestroyedBehaviour(this));
    this.registerBehaviour("takes_damage", new TakesDamageBehaviour(this));
    this.registerBehaviour("shield_recharge", new ShieldRechargeBehaviour(this));
    this.registerBehaviour("priamry", new PrimaryAttackBehaviour(this));
    this.registerBehaviour("special", new SpecialAttackBehaviour(this));
    this.registerBehaviour("collectDrop", new CollectDrop(this));
    this.registerBehaviour("colliedsWithDrop", new CollidesWithDrop(this));
    this.setupShip()
  }

  setWeaponCharge(n: number): void {
    this.weaponCharge = n;
    this.damage = this.getDamage();
  }

  setThrusters(n: number): void {
    this.thrusters = n;
    this.speed = this.getSpeed();
    this.accelleration = this.getAccelleration();
  }

  checkLevelUp(): void {
    while( this.kills > this.nextLevel ) {
      this.level += 1;
      this.upgradePoints += 1;
      this.updateNextLevel();
    }
  }

  clampToBounds(): void {
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

  addKill(currentWave: number, modelType: string): void {
    this.currentKills += 1;
    this.kills += 1;
    this.killScore += currentWave;
    this.$state.enemiesKilled++;
    if( !(modelType in this.tracker) ) this.tracker[modelType] = 1;
    else this.tracker[modelType] += 1;
    this.checkLevelUp();
  }

  updateNextLevel(): void {
    this.previousLevel = Math.floor(50*Math.pow(this.level-1, 1.25));
    this.nextLevel = Math.floor(50*Math.pow(this.level, 1.25));
  }

  generateTempUpgrades(type:string) {
    const r = Math.random() * 4;
    let upgradeIndex: number[];

    switch(r) {
      case 0:
        upgradeIndex = this.getRandomNumbers(Crystals.RED.length);
        for(var i = 0, l = upgradeIndex.length; i < l; i++) {
          this.tempUpgrades[i] = new TempUpgrade(Crystals.RED[upgradeIndex[i]]);
        }
      break;
      case 1:
        upgradeIndex = this.getRandomNumbers(Crystals.BLUE.length);
        for(var i = 0, l = upgradeIndex.length; i < l; i++) {
          this.tempUpgrades[i] = new TempUpgrade(Crystals.BLUE[upgradeIndex[i]]);
        }
      break;
      case 2:
        upgradeIndex = this.getRandomNumbers(Crystals.GREEN.length);
        for(var i = 0, l = upgradeIndex.length; i < l; i++) {
          this.tempUpgrades[i] = new TempUpgrade(Crystals.GREEN[upgradeIndex[i]]);
        }
      break;
      case 3:
        upgradeIndex = this.getRandomNumbers(Crystals.PURPLE.length);
        for(var i = 0, l = upgradeIndex.length; i < l; i++) {
          this.tempUpgrades[i] = new TempUpgrade(Crystals.PURPLE[upgradeIndex[i]]);
        }
      break;
    }
  }

  public selectUpgrade(index) {
    if(index >= this.tempUpgrades.length) return;
    this[this.tempUpgrades[index].key] += this.tempUpgrades[index].value;
    this.setupShip();
  }

  private getRandomNumbers(array: any): number[] {
    const u1: number;
    let u2: number, u3: number;

    u1 = Math.random() * array.length;
    u2 = Math.random() * array.length;
    u3 = Math.random() * array.length;
    while(u2 == u1){
      u2 = Math.random() * array.length;
    }
    while(u3 == u2 || u3 == u1) {
      u3 = Math.random() * array.length;
    }
    return [u1, u2, u3];
  }

  toSaveObject(): any {
    const baseObj: any = pick(this, [
      'name',
      'uuid',
      'username',
      'shipType',
      'shipMaterial',
      'primaryWeapon',
      'specialWeapon',
      'kills',
      'killScore',
      'rank',
      'highestWave',
      'level',
      'radius',
      'createdAt',
      'upgradePoints',
      'upgradeDamage',
      'upgradeRange',
      'upgradeFireRate',
      'upgradeAccelleration',
      'upgradeSpeed',
      'upgradeShieldsMax',
      'upgradeShieldsRecharge',
      'damageBase',
      'damageGrowth',
      'rangeBase',
      'rangeGrowth',
      'fireRateBase',
      'fireRateGrowth',
      'speedBase',
      'speedGrowth',
      'accellerationBase',
      'accellerationGrowth',
      'shieldsBase',
      'shieldsGrowth',
      'shieldRechargeBase',
      'shieldRechargeGrowth',
      'tracker'
    ]);
    return baseObj;
  }
}
