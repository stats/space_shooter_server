import { Room } from 'colyseus';

import { JWTHelper } from '../helpers/jwthelper';
import { AccountHelper } from '../helpers/AccountHelper';
import { ShipHelper } from '../helpers/ShipHelper';

import { Ship } from '../models/ship'

import { DB } from '../database';

export class ShipBuilderRoom extends Room {

  async onAuth(client, options) {
    console.log("[ShipBuilderRoom] Client auth attempt");
    const isValidToken = await JWTHelper.verifyToken(options.token);

    if(!isValidToken) {
      this.send(client, {
        error: 'error_invalid_token'
      });
      return false;
    }

    let username = JWTHelper.extractUsernameFromToken(options.token);

    return username;
  }

  onJoin(client, options, username) {
    console.log("[ShipBuilderRoom] Client joined: ", username);
    client.username = username;
    AccountHelper.clearInGame(username);
    this.sendShips(client);
  }

  onMessage(client, data) {
    if(data.action === 'play') return this.playShip(client, data.uuid);
    if(data.action === 'create') return this.createShip(client, data.ship);
    if(data.action === 'delete') return this.deleteShip(client, data.uuid);
  }

  onLeave(client) {

  }

  onDispose() {

  }

  private async playShip(client, uuid) {
    const ship = await ShipHelper.getShip(client.username, uuid);

    if(!ship) {
      this.send(client, { error: 'error_invalid_ship' })
      return;
    }
    ShipHelper.addInGame(uuid);
    this.send(client, { action: 'enter_match_making', ship});
  }

  private async sendShips(client) {
    let ships = await ShipHelper.getShips(client.username);
    this.send(client, { action: 'ships', ships});
  }

  private async createShip(client, ship) {
    console.log('[ShipBuilderROom] creating a ship', ship);
    /** TODO: Validate that the client can actually create this type of ship **/
    let success = await ShipHelper.createShip(client.username, ship);
    if(success) {
      this.send(client, { action: 'message', message: 'Ship successfully created.'});
    } else {
        this.send(client, { action: 'message', message: 'Unable to create the ship.'});
        return;
    }
    this.sendShips(client);
  }

  private async deleteShip(client, uuid) {
    let success = await ShipHelper.deleteShip(client.username, uuid);
    if(success) {
      this.send(client, { action: 'message', message: 'Ship successfully destroyed.'});
    } else {
      this.send(client, { action: 'message', message: 'Unable to destroy the ship.'});
    }
    this.sendShips(client);
  }

}
