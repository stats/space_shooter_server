import { Room } from 'colyseus';
import { MapSchema } from "@colyseus/schema";

import { JWTHelper } from '../helpers/JWTHelper';
import { AccountHelper } from '../helpers/AccountHelper';
import { ShipHelper } from '../helpers/ShipHelper';

import { Ship } from '../models/ship'

import { DB } from '../database';

import { Statistics } from '../models/Statistics';
import { Account } from '../models/Account'

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
    if(data.action === 'upgrade') return this.upgradeShip(client, data.uuid, data.upgrades);
    if(data.action === 'delete') return this.deleteShip(client, data.uuid);
    if(data.action === 'unlocked') return this.unlockedData(client);
    if(data.action === 'stats') return this.statsData(client);
  }

  onLeave(client) {

  }

  onDispose() {

  }

  private async unlockedData(client) {
    let account = await AccountHelper.getAccountByUsername(client.username);
    if(!account) {
      this.send(client, { action: "error", message: 'invalid_account'});
      return;
    }
    this.send(client, { action: "unlocks", message: account.unlocked });
  }

  private async statsData(client) {
    let account = await AccountHelper.getAccountByUsername(client.username);
    if(!account) {
      this.send(client, { action: "error", message: 'invalid_account'});
      return;
    }

    this.send(client, account.getStatistics() as Statistics);

    //this.send(client, { action: "stats", message: new MapSchema(account.stats) });
  }

  private async upgradeShip(client, uuid, upgrades) {
    const ship = await ShipHelper.getShip(client.username, uuid);
    if(!ship) {
      this.send(client, { action: "error", message: 'invalid_ship_to_upgrade'});
      return;
    }
    const return_ship = await ShipHelper.upgradeShip(ship, upgrades);
    //console.log("Return Ship", return_ship);
    if(return_ship) {
      this.send(client, { action: 'ship_upgrade_success'});
      this.sendShips(client);
      return;
    } else {
      this.send(client, { action: "error", message: 'error_could_not_upgrade'});
      return;
    }
  }

  private async playShip(client, uuid) {
    console.log('[ShipBuilderRoom] playShip', uuid);
    const ship = await ShipHelper.getShip(client.username, uuid);

    if(!ship) {
      this.send(client, { action: "error", message: 'error_invalid_ship' });
      return;
    }
    ShipHelper.addInGame(uuid);
    this.send(client, { action: 'enter_match_making', ship});
  }

  private async sendShips(client) {
    console.log('[ShipBuilderRoom] sending ships');
    let ships = await ShipHelper.getShips(client.username);
    let ship_list = [];
    for(let ship of ships) {
      ship_list.push(new Ship(ship));
    }
    this.send(client, { action: 'ships', ships: ship_list});
  }

  private async createShip(client, ship) {
    //console.log('[ShipBuilderRoom] creating a ship', ship);
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
