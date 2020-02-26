import { MapSchema, Schema, type } from "@colyseus/schema";
import { pick, merge } from 'lodash';
import { UsernameGenerator } from '../helpers/UsernameGenerator';
import { ShipHelper } from '../helpers/ShipHelper';
import { Ship } from './ship';
import { Statistics } from './Statistics';
import { UnlockMessage } from './UnlockMessage';
import { UnlockItem } from './UnlockItem';
import { SHIP } from '../Ship';
import { PRIMARY } from '../Primary';
import { SPECIAL } from '../Special';
import { MATERIAL } from '../Material';

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
    if(!this.stats) this.stats = options.stats || {};
    if(!this.createdAt) this.createdAt = Date.now();
    if(!this.username) this.username = UsernameGenerator.getUsername();
  }

  getStatistics():Statistics {
    return new Statistics(this.stats);
  }

  getUnlockMessage():UnlockMessage {
    let item:UnlockItem;
    let message:UnlockMessage = new UnlockMessage({});

    for(let key in SHIP.TYPE) {
      let t = SHIP.TYPE[key];
      if( !("unlock_key" in t) ) {
        item = new UnlockItem("", true, 0)
      } else {
        item = new UnlockItem(t.unlock_key, (key in this.unlocked), t.unlock_count)
      }
      message.unlocks[key] = item;
    }

    for(let key in PRIMARY.TYPE) {
      let t = PRIMARY.TYPE[key];
      if( !("unlock_key" in t) ) {
        item = new UnlockItem("", true, 0)
      } else {
        item = new UnlockItem(t.unlock_key, (key in this.unlocked), t.unlock_count)
      }
      message.unlocks[key] = item;
    }

    for(let key in SPECIAL.TYPE) {
      let t = SPECIAL.TYPE[key];
      if( !("unlock_key" in t) ) {
        item = new UnlockItem("", true, 0)
      } else {
        item = new UnlockItem(t.unlock_key, (key in this.unlocked), t.unlock_count)
      }
      message.unlocks[key] = item;
    }

    for(let key in MATERIAL.TYPE) {
      let t = MATERIAL.TYPE[key];
      if( !("unlock_key" in t) ) {
        item = new UnlockItem("", true, 0)
      } else {
        item = new UnlockItem(t.unlock_key, (key in this.unlocked), t.unlock_count)
      }
      message.unlocks[key] = item;
    }

    return message;
  }

  updateUnlocks() {

    for(let key in SHIP.TYPE) {
      /** We need do no tests if already unlocked. **/
      if(this.isUnlocked(key)) continue;
      let t = SHIP.TYPE[key];
      if( !("unlock_key" in t) ) {
        this.unlock(key);
      } else {
        if(this.getStat(t["unlock_key"]) >= t["unlock_count"]) this.unlock(key);
      }
    }

    for(let key in SPECIAL.TYPE) {
      /** We need do no tests if already unlocked. **/
      if(this.isUnlocked(key)) continue;
      let t = SPECIAL.TYPE[key];
      if( !("unlock_key" in t) ) {
        this.unlock(key);
      } else {
        if(this.getStat(t["unlock_key"]) >= t["unlock_count"]) this.unlock(key);
      }
    }

    for(let key in PRIMARY.TYPE) {
     /** We need do no tests if already unlocked. **/
     if(this.isUnlocked(key)) continue;
     let t = PRIMARY.TYPE[key];
     if( !("unlock_key" in t) ) {
       this.unlock(key);
     } else {
       if(this.getStat(t["unlock_key"]) >= t["unlock_count"]) this.unlock(key);
     }
    }

    for(let key in MATERIAL.TYPE) {
     /** We need do no tests if already unlocked. **/
     if(this.isUnlocked(key)) continue;
     let t = MATERIAL.TYPE[key];
     if( !("unlock_key" in t) ) {
       this.unlock(key);
     } else {
       if(this.getStat(t["unlock_key"]) >= t["unlock_count"]) this.unlock(key);
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
    this.updateUnlocks();
  }

  getStat(type) {
    if(type in this.stats) return this.stats[type];
    return 0;
  }

  updateStat(type, count) {
    if(!(type in this.stats) || count > this.stats[type]) this.stats[type] = count;
  }

  increaseStat(type, amount) {
    if(!(type in this.stats)) this.stats[type] = amount;
    else this.stats[type] += amount;
  }

  isUnlocked(type:string) {
    if(type in this.unlocked && this.unlocked[type] == true) return true;
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
