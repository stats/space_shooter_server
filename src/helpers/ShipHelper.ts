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
    let ship = new Ship({
      username,
      uuid: uuid(),
      name: data.name,
      body_type: data.body_type,
      wind_type: data.wing_type,
      engine_type: data.engine_type,
      weapon_type: data.weapon_type
    });
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
