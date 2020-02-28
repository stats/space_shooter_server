import { DB } from '../Database';
import { Account } from '../models/Account';
import { Ship } from '../models/Ship';
import { ShipList } from '../models/ShipList';
import { SHIP } from '../Ship';
import { AccountHelper } from './AccountHelper';

export class ShipHelper {

  static async getShip(username: string, shipUuid: string) {
    const ship = await DB.$ships.findOne({username, uuid: shipUuid});
    if(ship) return new Ship(ship);
    return null;
  }

  static async getShips(username: string) {
    return await DB.$ships.find({username}).toArray();
  }

  static async getShipList(username: string): Promise<ShipList> {
    const ships = await ShipHelper.getShips(username);
    const shipList: ShipList = new ShipList();
    for(let i = 0, l = ships.length; i < l; i++) {
      shipList.ships[ships[i].uuid] = new Ship(ships[i]);
    }
    return shipList;
  }

  static async validateShipParameters(username: string, data: { name: string; ship_type: string; ship_material: string; primary_weapon: string; special_weapon: string }) {
    const account = await AccountHelper.getAccountByUsername(username);
    if (data['name'].length > 3 && account.isUnlocked(data['ship_type']) && account.isUnlocked(data['ship_material']) && account.isUnlocked(data['primary_weapon']) && account.isUnlocked(data['special_weapon'])) {
      return true;
    }
    return false;
  }

  static setShipValues(shipData: any) {
    console.log(shipData);
    console.log(SHIP.TYPE[shipData.ship_type]);
    shipData['damage_base'] = SHIP.TYPE[shipData.ship_type]['damage_base'];
    shipData['damage_growth'] = SHIP.TYPE[shipData.ship_type]['damage_growth'];

    shipData['range_base'] = SHIP.TYPE[shipData.ship_type]['range_base'];
    shipData['range_growth'] = SHIP.TYPE[shipData.ship_type]['range_growth'];

    shipData['fireRate_base'] = SHIP.TYPE[shipData.ship_type]['fireRate_base'];
    shipData['fireRate_growth'] = SHIP.TYPE[shipData.ship_type]['fireRate_growth'];

    shipData['speedBase'] = SHIP.TYPE[shipData.ship_type]['speedBase'];
    shipData['speedGrowth'] = SHIP.TYPE[shipData.ship_type]['speedGrowth'];

    shipData['accelleration_base'] = SHIP.TYPE[shipData.ship_type]['accelleration_base'];
    shipData['accelleration_growth'] = SHIP.TYPE[shipData.ship_type]['accelleration_growth'];

    shipData['shields_base'] = SHIP.TYPE[shipData.ship_type]['shields_base'];
    shipData['shields_growth'] = SHIP.TYPE[shipData.ship_type]['shields_growth'];

    shipData['shield_recharge_base'] = SHIP.TYPE[shipData.ship_type]['shield_recharge_base'];
    shipData['shield_recharge_growth'] = SHIP.TYPE[shipData.ship_type]['shield_recharge_growth'];

    return shipData;
  }

  static async createShip(username: string, data: { name: string; ship_type: string; ship_material: string; primary_weapon: string; special_weapon: string }) {
    const canCreate = ShipHelper.validateShipParameters(username, data);
    if(!canCreate) return false;

    let shipData = {};
    shipData['username'] = username;
    shipData['name'] = data.name;
    shipData['ship_type'] = data.ship_type;
    shipData['ship_material'] = data.ship_material;
    shipData['primary_weapon'] = data.primary_weapon;
    shipData['special_weapon'] = data.special_weapon;
    shipData['level'] = 1;
    shipData['created_at'] = Date.now();
    shipData = ShipHelper.setShipValues(shipData);

    const account = await AccountHelper.getAccountByUsername(username);
    account.increaseStat("ships_created", 1);
    AccountHelper.saveAccount(account);

    const ship = new Ship(shipData);
    return DB.$ships.insertOne(ship.toSaveObject());
  }

  static async saveShip(ship: Ship) {
    return await DB.$ships.updateOne({uuid: ship.uuid}, { $set: ship.toSaveObject() });
  }

  static async deleteShip(username: string, uuid: string) {
    const account = await AccountHelper.getAccountByUsername(username);
    account.increaseStat("ships_destroyed", 1);
    AccountHelper.saveAccount(account);
    return await DB.$ships.deleteOne({username: username, uuid: uuid});
  }

  static async upgradeShip(ship: Ship, upgrades: any) {
    let spentPoints = 0;
    for (const key in upgrades) {
      spentPoints += upgrades[key];
    }
    if(spentPoints > ship.upgradePoints) {
      return false;
    } else {
      ship.upgradePoints -= spentPoints;
      for(const key in upgrades) {
        ship["upgrade_" + key] += upgrades[key];
      }
      return await DB.$ships.updateOne({uuid: ship.uuid}, {$set: ship.toSaveObject() });
    }
  }

  static async addInGame(uuid: string) {
    return await DB.$ships.updateOne({uuid: uuid}, { $set: { inGame: 1 }});
  }

  static async removeInGame(uuid: string) {
    return await DB.$ships.updateOne({uuid: uuid}, { $set: { inGame: -1 }});
  }

  static async getShipInGame(username: string): Promise<Ship> {
    const data = await DB.$ships.findOne({ username, inGame: 1});
    if(!data) return;
    return new Ship(data);
  }

}
