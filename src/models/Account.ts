import { Schema, type } from "@colyseus/schema";
import { pick, merge } from 'lodash';
import { UsernameGenerator } from '../helpers/UsernameGenerator';
import { ShipHelper } from '../helpers/ShipHelper';
import { Ship } from './ship';

export class Account extends Schema {

  createdAt:number;
  email:string;
  password:string;

  system_id:string;

  @type("string")
  username:string;

  unlocked:any;
  stats:any;

  constructor(options) {
    super();
    merge(this, options);
    if(!this.unlocked) this.unlocked = options.unlocked || {};
    if(!this.stats) this.stats = new options.stats || {};
    if(!this.createdAt) this.createdAt = Date.now();
    if(!this.username) this.username = UsernameGenerator.getUsername();
  }

  updateUnlocks() {
    /**
     * Ship based Unlocks
     **/
    this.unlock("explorer1");
    this.updateShipTypeLevelUnlock("explorer");

    this.unlock("scout1");
    this.updateShipTypeLevelUnlock("scout");

    this.unlock("fighter1");
    this.updateShipTypeKillsUnlock("fighter");

    if( this.getStat("max_level") >= 5 ) {
      this.unlock("defender1");
      this.updateShipTypeLevelUnlock("defender");
    }

    if( this.getStat("max_kills") >= 500) {
      this.unlock("gunship1");
      this.updateShipTypeKillsUnlock("kills")
    }

    /**
     * Special based unlocks
     **/

    this.unlock("Weapon Charge");
    this.unlock("Emergency Brake");
    this.unlock("Thrusters");

    if( this.getStat("max_level_Emergency Brake") >= 5) this.unlock("Shield Recharge");
    if( this.getStat("max_level_Shield Recharge") >= 6) this.unlock("Ramming Shield");
    if( this.getStat("max_level_Ramming Shield") >= 8) this.unlock("Force Shield");

    if( this.getStat("max_kills_Weapon_Charge") >= 200) this.unlock("Shotgun");
    if( this.getStat("max_kills_Shotgun") >= 300 ) this.unlock("Bomb");
    if( this.getStat("max_kills_Bomb") > 400 ) this.unlock("Mega Bomb");
    if( this.getStat("max_kills_Mega Bomb") > 500 ) this.unlock("Scatter Shot");
    if( this.getStat("max_kills_Scatter Shot") > 500 ) this.unlock("Missile Barrage");

    if( this.getStat("max_level_Thrusters") >= 5) this.unlock("Hyper Speed");
    if( this.getStat("max_level_Hyper Speed") >= 5) this.unlock("Invisibility");

    /**
     * Primary based unlocks
     **/
     this.unlock("Cannon");
     if( this.getStat("max_kills_Cannon") >= 200 ) this.unlock("Cannon 2.0");
     if( this.getStat("max_kills_Cannon") >= 750 ) this.unlock("Rapid");
     if( this.getStat("max_kills_Cannon 2.0") >= 300 ) this.unlock("Cannon 3.0");
     if( this.getStat("max_kills_Cannon 3.0") >= 750 ) this.unlock("Missile");
     if( this.getStat("max_kills_Missile") >= 750 ) this.unlock("Double Missile");
     if( this.getStat("max_kills_Double Missile") >= 1000 ) this.unlock("Triple Missile");

     this.unlock("Blaster");
     if( this.getStat("max_kills_Blaster") >= 200 ) this.unlock("Blaster 2.0");
     if( this.getStat("max_kills_Blaster 2.0") >= 200 ) this.unlock("Beam");
     if( this.getStat("max_kills_Beam") >= 500 ) this.unlock("Double Beam");
     if( this.getStat("max_kills_Double Beam") >= 500 ) this.unlock("Triple Beam");
     if( this.getStat("max_kills_Blaster 2.0") >= 500 ) this.unlock("Blaster 3.0");
     if( this.getStat("max_kills_Blaster 3.0") >= 750 ) this.unlock("Torpedo");

     if( this.getStat("max_kills_Torpedo") >= 750 ) this.unlock("Double Torpedo");
     if( this.getStat("max_kills_Double Torpedo") >= 1000 ) this.unlock("Triple Torpedo");
  }

  updateShipTypeLevelUnlock(ship_type) {
    for(var i = 1; i < 4; i++) {
      if(this.getStat(`max_level_${ship_type}${i}`) >= 3 + i ) {
        this.unlock(`${type}${i+1}`);
      } else {
        return;
      }
    }
  }

  updateShipTypeKillsUnlock(ship_type) {
    for(var i = 1; i < 4; i++) {
      if(this.getStat(`max_kills_${ship_type}${i}`) >= 500 + (i * 100) ) {
        this.unlock(`${type}${i+1}`);
      } else {
        return;
      }
    }
  }

  updateStatsWithShip(ship:Ship) {
    this.updateStat("max_level", ship.level);
    this.updateStat(`max_level_${ship.ship_type}`, ship.level);

    this.updateStat("max_kills", ship.kills);
    this.updateStat(`max_kills_${ship.ship_type}`, ship.kills);
    this.updateStat(`max_kills_${ship.primary_weapon}`, ship.kills);
    this.updateStat(`max_kills_${ship.special_weapon}`, ship.kills);

    for(let key in ship.tracker) {
      this.updateStat(`max_kills_${key}`, ship.tracker[key]);
    }
  }

  getStat(type) {
    if(this.stats.has(type)) return this.stats[type];
    return 0;
  }

  updateStat(type, count) {
    if(count > this.stats[type]) this.stats[type] = count;
  }

  isUnlocked(type:string) {
    if(this.unlocked.has(type) && this.unlocked[type] == true) return true;
    return false;
  }

  unlock(type:string) {
    this.unlocked[type] = true;
  }

  public toSaveObject(): any {
    const baseObj:any = pick(this, [
      'createdAt', 'email', 'password', 'system_id', 'username', 'unlocked', 'stats'
    ]);
    return baseObj;
  }


}
