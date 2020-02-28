import { Room, Client } from 'colyseus';

import { JWTHelper } from '../helpers/JWTHelper';
import { AccountHelper } from '../helpers/AccountHelper';
import { ShipHelper } from '../helpers/ShipHelper';

import { ErrorMessage } from '../models/ErrorMessage';
import { ShipList } from '../models/ShipList';

import { ShipBuilderState } from '../models/ShipBuilderState'

export class ShipBuilderRoom extends Room<ShipBuilderState> {

  onCreate(options: any): void {
    this.setState(new ShipBuilderState());
  }

  async onAuth(client: Client, options:any): Promise<any> {
    console.log("[ShipBuilderRoom] Client auth attempt");
    const isValidToken = await JWTHelper.verifyToken(options.token);

    if(!isValidToken) {
      this.send(client, {
        error: 'error_invalid_token'
      });
      return false;
    }

    const username = JWTHelper.extractUsernameFromToken(options.token);

    return username;
  }

  onJoin(client: Client, options: any, username: string): void {
    console.log("[ShipBuilderRoom] Client joined: ", username);
    client["username"] = username;
    AccountHelper.clearInGame(username);
    this.sendShips(client);
  }

  onMessage(client: Client, data: any): void {
    switch(data.action) {
      case 'play': this.playShip(client, data.uuid); return;
      case 'create': this.createShip(client, data.ship); return;
      case 'upgrade': this.upgradeShip(client, data.uuid, data.upgrades); return;
      case 'delete': this.deleteShip(client, data.uuid); return;
      case 'unlocked': this.unlockedData(client); return;
      case 'stats': this.statsData(client); return;
    }
  }

  private async unlockedData(client: Client): Promise<void> {
    const account = await AccountHelper.getAccountByUsername(client["username"]);
    if(!account) {
      this.send(client, new ErrorMessage('Your account could not be found', 'invalid_account'));
      return;
    }
    console.log("[ShipBuilderRoom] Sending UnlockMessage");
    this.send(client, account.getUnlockMessage());
  }

  private async statsData(client: Client): Promise<void> {
    const account = await AccountHelper.getAccountByUsername(client["username"]);
    if(!account) {
      this.send(client, new ErrorMessage('Your account could not be found', 'invalid_account'));
      return;
    }

    this.send(client, account.getStatistics());

    //this.send(client, { action: "stats", message: new MapSchema(account.stats) });
  }

  private async upgradeShip(client: Client, uuid: string, upgrades: any): Promise<void> {
    const ship = await ShipHelper.getShip(client["username"], uuid);
    if(!ship) {
      this.send(client, new ErrorMessage('The ship requested could not be found', 'invalid_ship'));
      return;
    }
    const returnShip = await ShipHelper.upgradeShip(ship, upgrades);
    //console.log("Return Ship", returnShip);
    if(returnShip) {
      this.send(client, { action: 'ship_upgrade_success'});
      this.sendShips(client);
      return;
    } else {
      this.send(client, new ErrorMessage('The ship could not be upgraded', 'error_could_not_upgrade'));
      return;
    }
  }

  private async playShip(client: Client, uuid: string): Promise<void> {
    console.log('[ShipBuilderRoom] playShip', uuid);
    const ship = await ShipHelper.getShip(client["username"], uuid);

    if(!ship) {
      this.send(client, new ErrorMessage('The ship requested could not be found', 'invalid_ship'));
      return;
    }
    ShipHelper.addInGame(uuid);
    this.send(client, { action: 'enter_match_making', ship});
  }

  private async sendShips(client: Client): Promise<void> {
    console.log('[ShipBuilderRoom] sending ships');
    const ships: ShipList = await ShipHelper.getShipList(client["username"]);
    this.send(client, ships);
  }

  private async createShip(client: Client, ship: any): Promise<void> {
    //console.log('[ShipBuilderRoom] creating a ship', ship);
    const success = await ShipHelper.createShip(client["username"], ship);
    if(success) {
      this.send(client, { action: 'message', message: 'Ship successfully created.'});
    } else {
        this.send(client, new ErrorMessage('The ship could not be created', 'create_ship_failure'));
        return;
    }
    this.sendShips(client);
  }

  private async deleteShip(client: Client, uuid: string): Promise<void> {
    const success = await ShipHelper.deleteShip(client["username"], uuid);
    if(success) {
      this.send(client, { action: 'message', message: 'Ship successfully destroyed.'});
    } else {
      this.send(client, new ErrorMessage('The ship requested could not be deleted', 'delete_ship_failure'));
    }
    this.sendShips(client);
  }

}
