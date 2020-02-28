import { Schema, type } from "@colyseus/schema";
import { pick, merge } from 'lodash';
import { UsernameGenerator } from '../helpers/UsernameGenerator';
import { Ship } from './Ship';
import { Statistics } from './Statistics';
import { UnlockMessage } from './UnlockMessage';
import { UnlockItem } from './UnlockItem';
import { SHIP } from '../Ship';
import { PRIMARY } from '../Primary';
import { SPECIAL } from '../Special';
import { MATERIAL } from '../Material';

export class Account extends Schema {

  createdAt: number;
  email: string;
  password: string;

  systemId: string;

  @type("string")
  username: string;

  unlocked: any;
  stats: any;

  constructor(options:any) {
    super();
    merge(this, options);
    if(!this.unlocked) this.unlocked = options.unlocked || {};
    if(!this.stats) this.stats = options.stats || {};
    if(!this.createdAt) this.createdAt = Date.now();
    if(!this.username) this.username = UsernameGenerator.getUsername();
  }

  getStatistics(): Statistics {
    return new Statistics(this.stats);
  }

  getUnlockMessage(): UnlockMessage {
    let item: UnlockItem;
    const message: UnlockMessage = new UnlockMessage({});

    for(const key in SHIP.TYPE) {
      const t = SHIP.TYPE[key];
      if( !("unlockKey" in t) ) {
        item = new UnlockItem("", true, 0)
      } else {
        item = new UnlockItem(t.unlockKey, (key in this.unlocked), t.unlockCount)
      }
      message.unlocks[key] = item;
    }

    for(const key in PRIMARY.TYPE) {
      const t = PRIMARY.TYPE[key];
      if( !("unlockKey" in t) ) {
        item = new UnlockItem("", true, 0)
      } else {
        item = new UnlockItem(t.unlockKey, (key in this.unlocked), t.unlockCount)
      }
      message.unlocks[key] = item;
    }

    for(const key in SPECIAL.TYPE) {
      const t = SPECIAL.TYPE[key];
      if( !("unlockKey" in t) ) {
        item = new UnlockItem("", true, 0)
      } else {
        item = new UnlockItem(t.unlockKey, (key in this.unlocked), t.unlockCount)
      }
      message.unlocks[key] = item;
    }

    for(const key in MATERIAL.TYPE) {
      const t = MATERIAL.TYPE[key];
      if( !("unlockKey" in t) ) {
        item = new UnlockItem("", true, 0)
      } else {
        item = new UnlockItem(t.unlockKey, (key in this.unlocked), t.unlockCount)
      }
      message.unlocks[key] = item;
    }

    return message;
  }

  updateUnlocks(): void {

    for(const key in SHIP.TYPE) {
      /** We need do no tests if already unlocked. **/
      if(this.isUnlocked(key)) continue;
      const t = SHIP.TYPE[key];
      if( !("unlockKey" in t) ) {
        this.unlock(key);
      } else {
        if(this.getStat(t["unlockKey"]) >= t["unlockCount"]) this.unlock(key);
      }
    }

    for(const key in SPECIAL.TYPE) {
      /** We need do no tests if already unlocked. **/
      if(this.isUnlocked(key)) continue;
      const t = SPECIAL.TYPE[key];
      if( !("unlockKey" in t) ) {
        this.unlock(key);
      } else {
        if(this.getStat(t["unlockKey"]) >= t["unlockCount"]) this.unlock(key);
      }
    }

    for(const key in PRIMARY.TYPE) {
     /** We need do no tests if already unlocked. **/
     if(this.isUnlocked(key)) continue;
     const t = PRIMARY.TYPE[key];
     if( !("unlockKey" in t) ) {
       this.unlock(key);
     } else {
       if(this.getStat(t["unlockKey"]) >= t["unlockCount"]) this.unlock(key);
     }
    }

    for(const key in MATERIAL.TYPE) {
     /** We need do no tests if already unlocked. **/
     if(this.isUnlocked(key)) continue;
     const t = MATERIAL.TYPE[key];
     if( !("unlockKey" in t) ) {
       this.unlock(key);
     } else {
       if(this.getStat(t["unlockKey"]) >= t["unlockCount"]) this.unlock(key);
     }
    }

  }

  updateStatsWithShip(ship: Ship): void {
    this.updateStat("maxLevel", ship.level);
    this.updateStat(`maxLevel_${ship.shipType}`, ship.level);

    this.updateStat("maxKills", ship.kills);
    this.updateStat(`maxKills_${ship.shipType}`, ship.kills);
    this.updateStat(`maxKills_${ship.primaryWeapon}`, ship.kills);
    this.updateStat(`maxKills_${ship.specialWeapon}`, ship.kills);

    for(const key in ship.tracker) {
      this.updateStat(`maxKills_${key}`, ship.tracker[key]);
    }
    this.updateUnlocks();
  }

  getStat(type): number {
    if(type in this.stats) return this.stats[type];
    return 0;
  }

  updateStat(type, count): void {
    if(!(type in this.stats) || count > this.stats[type]) this.stats[type] = count;
  }

  increaseStat(type, amount): void {
    if(!(type in this.stats)) this.stats[type] = amount;
    else this.stats[type] += amount;
  }

  isUnlocked(type: string): boolean {
    if(type in this.unlocked && this.unlocked[type] == true) return true;
    return false;
  }

  unlock(type: string): void {
    this.unlocked[type] = true;
  }

  public toSaveObject(): any {
    const baseObj: any = pick(this, [
      'createdAt', 'email', 'password', 'systemId', 'username', 'unlocked', 'stats'
    ]);
    return baseObj;
  }


}
