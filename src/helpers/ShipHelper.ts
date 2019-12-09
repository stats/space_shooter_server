import { DB } from '../database';
import { Account } from '../models/account';
import { Ship } from '../models/ship';
//import * as uuid from 'uuid/v4';

const uuid = require('uuid/v4');

export class ShipHelper {

  static async getShip(username:string, ship_uuid:string) {
    const ship = await DB.$ships.findOne({username, uuid: ship_uuid});
    if(ship) return new Ship(ship);
    return null;
  }

  static async getShips(username:string) {
    return await DB.$ships.find({username}).toArray();
  }

  static async createShip(username:string, data:any) {
    data["username"] = username;
    data["uuid"] = uuid();
    data["accelleration"] = 50;
    data["speed"] = 50;
    data["max_shields"] = 1;
    data["upgrade_points"] = 5;
    data["level"] = 1;
    data["next_level"] = 50;
    let ship = new Ship(data);
    console.log("Ship to save", ship.toSaveObject());
    return DB.$ships.insertOne(ship.toSaveObject());
  }

  static async saveShip(ship:Ship) {
    return await DB.$ships.updateOne({uuid: ship.uuid}, { $set: ship.toSaveObject() });
  }

  static async deleteShip(username:string, uuid:string) {
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
