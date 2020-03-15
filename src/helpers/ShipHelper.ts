import { DB } from '../Database';
import { Ship } from '../models/Ship';
import { ShipList } from '../models/messages';
import { SHIP } from '../Ship';
import { AccountHelper } from './AccountHelper';

export class ShipHelper {

  static async getShip(username: string, shipUuid: string): Promise<Ship> {
    const ship = await DB.$ships.findOne({username, uuid: shipUuid});
    if(ship) return new Ship(ship);
    return null;
  }

  static async getShips(username: string): Promise<Ship[]> {
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

  static async validateShipParameters(username: string, data: { name: string; shipType: string; shipMaterial: string; primaryWeapon: string; specialWeapon: string }): Promise<boolean> {
    const account = await AccountHelper.getAccountByUsername(username);
    if (data['name'].length > 3 && account.isUnlocked(data['shipType']) && account.isUnlocked(data['shipMaterial']) && account.isUnlocked(data['primaryWeapon']) && account.isUnlocked(data['specialWeapon'])) {
      return true;
    }
    return false;
  }

  static async createShip(username: string, data: { name: string; shipType: string; shipMaterial: string; primaryWeapon: string; specialWeapon: string }): Promise<any> {
    const canCreate = ShipHelper.validateShipParameters(username, data);
    if(!canCreate) return false;

    let shipData = {};
    shipData['username'] = username;
    shipData['name'] = data.name;
    shipData['shipType'] = data.shipType;
    shipData['shipMaterial'] = data.shipMaterial;
    shipData['primaryWeapon'] = data.primaryWeapon;
    shipData['specialWeapon'] = data.specialWeapon;
    shipData['level'] = 1;
    shipData['createdAt'] = Date.now();

    const account = await AccountHelper.getAccountByUsername(username);
    account.increaseStat("shipsCreated", 1);
    AccountHelper.saveAccount(account);

    const ship = new Ship(shipData);
    return await DB.$ships.insertOne(ship.toSaveObject());
  }

  static async saveShip(ship: Ship): Promise<any> {
    return await DB.$ships.updateOne({uuid: ship.uuid}, { $set: ship.toSaveObject() });
  }

  static async deleteShip(username: string, uuid: string): Promise<any> {
    const account = await AccountHelper.getAccountByUsername(username);
    account.increaseStat("shipsDestroyed", 1);
    AccountHelper.saveAccount(account);
    return await DB.$ships.deleteOne({username: username, uuid: uuid});
  }

  static async upgradeShip(ship: Ship, upgrades: any): Promise<any> {
    let spentPoints = 0;
    for (const key in upgrades) {
      spentPoints += upgrades[key];
    }
    if(spentPoints > ship.upgradePoints) {
      return false;
    } else {
      ship.upgradePoints -= spentPoints;
      for(const key in upgrades) {
        ship["upgrade" + key] += upgrades[key];
      }
      return await DB.$ships.updateOne({uuid: ship.uuid}, {$set: ship.toSaveObject() });
    }
  }

  static async addInGame(uuid: string): Promise<any> {
    return await DB.$ships.updateOne({uuid: uuid}, { $set: { inGame: 1 }});
  }

  static async removeInGame(uuid: string): Promise<any> {
    return await DB.$ships.updateOne({uuid: uuid}, { $set: { inGame: -1 }});
  }

  static async getShipInGame(username: string): Promise<Ship> {
    const data = await DB.$ships.findOne({ username, inGame: 1});
    if(!data) return;
    return new Ship(data);
  }

}
