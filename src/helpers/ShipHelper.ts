import { DB } from '../database';
import { Account } from '../models/Account';
import { Ship } from '../models/ship';
import { SHIP } from '../Ship';
import { AccountHelper } from './AccountHelper';

export class ShipHelper {

  static async getShip(username:string, ship_uuid:string) {
    const ship = await DB.$ships.findOne({username, uuid: ship_uuid});
    if(ship) return new Ship(ship);
    return null;
  }

  static async getShips(username:string) {
    return await DB.$ships.find({username}).toArray();
  }

  static async validateShipParameters(username:string, data:{ name:string, ship_type:string, ship_material:string, primary_weapon:string, special_weapon:string }) {
    let account = await AccountHelper.getAccountByUsername(username);
    if (data['name'].length > 3 && account.isUnlocked(data['ship_type']) && account.isUnlocked(data['ship_material']) && account.isUnlocked(data['primary_weapon']) && account.isUnlocked(data['special_weapon'])) {
      return true;
    }
    return false;
  }

  static setShipValues(ship_data:any) {
    console.log(ship_data);
    console.log(SHIP.TYPES[ship_data.ship_type]);
    ship_data['damage_base'] = SHIP.TYPES[ship_data.ship_type]['damage_base'];
    ship_data['damage_growth'] = SHIP.TYPES[ship_data.ship_type]['damage_growth'];

    ship_data['range_base'] = SHIP.TYPES[ship_data.ship_type]['range_base'];
    ship_data['range_growth'] = SHIP.TYPES[ship_data.ship_type]['range_growth'];

    ship_data['fire_rate_base'] = SHIP.TYPES[ship_data.ship_type]['fire_rate_base'];
    ship_data['fire_rate_growth'] = SHIP.TYPES[ship_data.ship_type]['fire_rate_growth'];

    ship_data['speed_base'] = SHIP.TYPES[ship_data.ship_type]['speed_base'];
    ship_data['speed_growth'] = SHIP.TYPES[ship_data.ship_type]['speed_growth'];

    ship_data['accelleration_base'] = SHIP.TYPES[ship_data.ship_type]['accelleration_base'];
    ship_data['accelleration_growth'] = SHIP.TYPES[ship_data.ship_type]['accelleration_growth'];

    ship_data['shields_base'] = SHIP.TYPES[ship_data.ship_type]['shields_base'];
    ship_data['shields_growth'] = SHIP.TYPES[ship_data.ship_type]['shields_growth'];

    ship_data['shield_recharge_base'] = SHIP.TYPES[ship_data.ship_type]['shield_recharge_base'];
    ship_data['shield_recharge_growth'] = SHIP.TYPES[ship_data.ship_type]['shield_recharge_growth'];

    return ship_data;
  }

  static async createShip(username:string, data:{ name:string, ship_type:string, ship_material:string, primary_weapon:string, special_weapon:string }) {
    let can_create = ShipHelper.validateShipParameters(username, data);
    if(!can_create) return false;

    let ship_data = {};
    ship_data['username'] = username;
    ship_data['name'] = data.name;
    ship_data['ship_type'] = data.ship_type;
    ship_data['ship_material'] = data.ship_material;
    ship_data['primary_weapon'] = data.primary_weapon;
    ship_data['special_weapon'] = data.special_weapon;
    ship_data['level'] = 1;
    ship_data['created_at'] = Date.now();
    ship_data = ShipHelper.setShipValues(ship_data);

    let account = await AccountHelper.getAccountByUsername(username);
    account.increaseStat("ships_created", 1);
    AccountHelper.saveAccount(account);

    let ship = new Ship(ship_data);
    return DB.$ships.insertOne(ship.toSaveObject());
  }

  static async saveShip(ship:Ship) {
    return await DB.$ships.updateOne({uuid: ship.uuid}, { $set: ship.toSaveObject() });
  }

  static async deleteShip(username:string, uuid:string) {
    let account = await AccountHelper.getAccountByUsername(username);
    account.increaseStat("ships_destroyed", 1);
    AccountHelper.saveAccount(account);
    return await DB.$ships.deleteOne({username: username, uuid: uuid});
  }

  static async upgradeShip(ship:Ship, upgrades:any) {
    let spent_points:number = 0;
    for (let key in upgrades) {
      spent_points += upgrades[key];
    }
    if(spent_points > ship.upgrade_points) {
      return false;
    } else {
      ship.upgrade_points -= spent_points;
      for(let key in upgrades) {
        ship["upgrade_" + key] += upgrades[key];
      }
      return await DB.$ships.updateOne({uuid: ship.uuid}, {$set: ship.toSaveObject() });
    }
  }

  static async addInGame(uuid:string) {
    return await DB.$ships.updateOne({uuid: uuid}, { $set: { inGame: 1 }});
  }

  static async removeInGame(uuid:string) {
    return await DB.$ships.updateOne({uuid: uuid}, { $set: { inGame: -1 }});
  }

  static async getShipInGame(username:string):Promise<Ship> {
    let data = await DB.$ships.findOne({ username, inGame: 1});
    if(!data) return;
    return new Ship(data);
  }

}
