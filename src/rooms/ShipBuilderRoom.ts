import { Room } from 'colyseus';
import { MapSchema } from "@colyseus/schema";

import { JWTHelper } from '../helpers/JWTHelper';
import { AccountHelper } from '../helpers/AccountHelper';
import { ShipHelper } from '../helpers/ShipHelper';

import { Ship } from '../models/Ship'
import { ErrorMessage } from '../models/ErrorMessage';
import { ShipList } from '../models/ShipList';

import { DB } from '../Database';

import { ShipBuilderState } from '../models/ShipBuilderState'


export class ShipBuilderRoom extends Room<ShipBuilderState> {

  onCreate(options) {
    this.setState(new ShipBuilderState());
  }

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
      this.send(client, new ErrorMessage('Your account could not be found', 'invalid_account'));
      return;
    }
    console.log("[ShipBuilderRoom] Sending UnlockMessage");
    this.send(client, account.getUnlockMessage());
  }

  private async statsData(client) {
    let account = await AccountHelper.getAccountByUsername(client.username);
    if(!account) {
      this.send(client, new ErrorMessage('Your account could not be found', 'invalid_account'));
      return;
    }

    this.send(client, account.getStatistics());

    //this.send(client, { action: "stats", message: new MapSchema(account.stats) });
  }

  private async upgradeShip(client, uuid, upgrades) {
    const ship = await ShipHelper.getShip(client.username, uuid);
    if(!ship) {
      this.send(client, new ErrorMessage('The ship requested could not be found', 'invalid_ship'));
      return;
    }
    const return_ship = await ShipHelper.upgradeShip(ship, upgrades);
    //console.log("Return Ship", return_ship);
    if(return_ship) {
      this.send(client, { action: 'ship_upgrade_success'});
      this.sendShips(client);
      return;
    } else {
      this.send(client, new ErrorMessage('The ship could not be upgraded', 'error_could_not_upgrade'));
      return;
    }
  }

  private async playShip(client, uuid) {
    console.log('[ShipBuilderRoom] playShip', uuid);
    const ship = await ShipHelper.getShip(client.username, uuid);

    if(!ship) {
      this.send(client, new ErrorMessage('The ship requested could not be found', 'invalid_ship'));
      return;
    }
    ShipHelper.addInGame(uuid);
    this.send(client, { action: 'enter_match_making', ship});
  }

  private async sendShips(client) {
    console.log('[ShipBuilderRoom] sending ships');
    let ships = await ShipHelper.getShips(client.username);
    let sl = new ShipList();
    for(var i = 0, l = ships.length; i < l; i++) {
      sl.ships[ships[i].uuid] = new Ship(ships[i]);
    }
    this.send(client, sl);
  }

  private async createShip(client, ship) {
    //console.log('[ShipBuilderRoom] creating a ship', ship);
    let success = await ShipHelper.createShip(client.username, ship);
    if(success) {
      this.send(client, { action: 'message', message: 'Ship successfully created.'});
    } else {
        this.send(client, new ErrorMessage('The ship could not be created', 'create_ship_failure'));
        return;
    }
    this.sendShips(client);
  }

  private async deleteShip(client, uuid) {
    let success = await ShipHelper.deleteShip(client.username, uuid);
    if(success) {
      this.send(client, { action: 'message', message: 'Ship successfully destroyed.'});
    } else {
      this.send(client, new ErrorMessage('The ship requested could not be deleted', 'delete_ship_failure'));
    }
    this.sendShips(client);
  }

}
