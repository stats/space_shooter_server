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
    data["accelleration"] = 0.1;
    data["speed"] = 25;
    data["max_shields"] = 1;
    let ship = new Ship(data);
    console.log("Ship to save", ship.toSaveObject());
    return DB.$ships.insertOne(ship.toSaveObject());
  }

  static async deleteShip(username:string, uuid:string) {
    return await DB.$ships.deleteOne({username: username, uuid: uuid});
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
