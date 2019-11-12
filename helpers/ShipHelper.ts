import { DB } from '../database';
import { Account } from '../models/account';
import * as uuid from 'uuid/v4';

export class ShipHelper {

  static async getShip(username:string, ship_uuid:string) {
    const ship = await DB.$ships.findOne({username, uuid: ship_uuid});
    if(ship) return Ship(ship);
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
    return DB.$ships.insertOne(ship);
  }

  static async deleteShip(username:string, uuid) {
    return await DB.$ships.deleteOne({username: username, uuid: uuid});
  }

}
