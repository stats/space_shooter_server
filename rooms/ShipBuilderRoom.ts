import { Room } from 'colyseus';

import { JWTHelper } from '../helpers/jwthelper';
import { Accounthelper } from '../helpers/AccountHelper';

import { Ship } from '../models/ship';

import { DB } from '../database';

export class ShipBuilderRoom extends Room {

  async onAuth(client, options) {
    const isValidToken = await JWTHelper.verifyToken(options.token);

    if(!isValidToken) {
      this.send(client, {
        error: 'error_invalid_token'
      });
      return false;
    }

    let username = JWTHelper.extractUsernameFromToken(options.token);

    let account = await AccountHelper.getAccountByUsername(username);
    account.colyseusId = client.id;
    AccountHelper.saveAccount(account);

    return username;
  }

  onJoin(client, options, username) {
    console.log("[ShipBuilderRoom] Client joined: ", username);
    client.username = username;
    this.sendShips(client);
  }

  onMessage(client, data) {
    if(data.action === 'play') return this.playShip(client, data.uuid);
    if(data.action === 'create') return this.createShip(client, data);
    if(data.action === 'delete') return this.deleteShip(client, data.uuid);
  }

  private async playShip(client, uuid) {
    const account = await AccountHelper.getAccountByUsername(client.username);
    if(!account) {
      this.send(client, {
        error: 'error_invalid_account'
      })
      return;
    }

    const ship = await DB.$ships.findOne({ uuid: uuid });

    if(!ship) {
      this.send(client, {
        error: 'error_invalid_ship'
      })
      return;
    }

    this.send(client, { action: 'enter_match_making', ship});
  }

  private async sendShips(client) {
    let ships = ShipHelper.getShipForUsername(client.username);
    this.send(client, { action: 'ships', ships});
  }

  private async createShip(client, { ship }) {
    let success = ShipHelper.buildShip(client.username, ship);
    if(success) {
      this.send(client, { action: 'message', message: 'Ship successfully created.'});
    } else {

        this.send(client, { action: 'message', message: 'Unable to create the ship.'});
    }
    this.sendShips(client);
  }

  private async deleteShip(client, uuid) {
    let success = ShipHelper.deleteShip(client.username, uuid);
    if(success) {
      this.send(client, { action: 'message', message: 'Ship successfully destroyed.'});
    } else {
      this.send(client, { action: 'message', message: 'Unable to destroy the ship.'});
    }
    this.sendShips(client);
  }

}
