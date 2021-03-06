import { Room, Delayed , Client} from 'colyseus';

import { JWTHelper } from '../helpers/JWTHelper';
import { ShipHelper } from '../helpers/ShipHelper';

import { Bullet, Enemy, Ship, Drop } from '../models';
import { GameState } from '../models/states/GameState';

import { Spawner } from '../spawner/Spawner';

export class GameRoom extends Room<GameState> {

  maxClients = 4;

  spawnCompleteFrequency = 1000;

  clientShipHash: any = {};

  spawner;

  private spawnCompleteInterval: Delayed;

  onCreate(options: any): void {
    console.log('[GameRoom]', this.roomId, 'Created');
    this.setSimulationInterval((deltaTime) => this.onUpdate(deltaTime));
    this.setState(new GameState());

    this.state.startWave = Math.max(options.waveRank, 1) || 1;
    this.state.currentWave = this.state.startWave;

    this.spawner = new Spawner(this);

    // const gameStartTimeout = this.clock.setInterval(() => {
    //   this.state.startGame -= 1;
    //   this.broadcast(`Battle Starts In ${this.state.startGame} Seconds`);
    //   if(this.state.startGame <= 0) {
    //     this.startWave();
    //     gameStartTimeout.clear();
    //   }
    // }, 1000);

  }

  async onAuth(client: Client, options: any): Promise<any> {
    const isValidToken = await JWTHelper.verifyToken(options.token);

    if(!isValidToken) {
      this.send(client, { error: 'error_invalid_token' });
      return false;
    }

    const username = JWTHelper.extractUsernameFromToken(options.token)

    return username;
  }

  async onJoin(client: Client, options: any, username: string): Promise<void> {
    console.log('[GameRoom]', this.roomId, 'Client Join', username);
    const ship = await ShipHelper.getShipInGame(username);
    ship.position.x = 700 + (Math.random() * 200);
    ship.position.y = 350 + (Math.random() * 200);
    if(!ship) {
      this.send(client, { error: 'no_ship_in_game'});
      return;
    }
    ship.connected = true;
    this.clientShipHash[client.id] = ship;
    this.state.addShip(ship)
  }

  onMessage(client: Client, data: any): void {
    if(data.action === "input") this.handleClientInput(client, data.input);
  }

  async onLeave(client: Client, consented: boolean): Promise<void> {
    console.log('[GameRoom] On Leave (consented):', consented)
    const ship = this.clientShipHash[client.id];
    ship.connected = false;
    try {
      if(consented) {
        /** This error allows the room to be cleaned up **/
        throw new Error("consented leave");
      }
      // allow a disconnected client up to 5 seconds to reconnect.
      await this.allowReconnection(client, 5);
      ship.connected = true;
      console.log('[GameRoom] Client has Reconnected.');
    } catch(e) {
      console.log('[GameRoom] Client Failed to Reconnect.');
      ship.checkLevelUp();
      ship.updateWaveRank(this.state.currentWave);
      ShipHelper.saveShip(ship);
      this.state.removeShip(ship);
      ShipHelper.removeInGame(ship.uuid);
      delete this.clientShipHash[client.id];
    }
  }

  onDispose(): void {
    console.log("[GameRoom]", this.roomId, "Disposed");
  }

  onUpdate( deltaTime: number ): void {
    let uuid;
    for(uuid in this.state.ships) {
      const ship: Ship = this.state.ships[uuid];
      ship.onUpdate(deltaTime);
    }
    for(uuid in this.state.enemies) {
      const enemy: Enemy = this.state.enemies[uuid];
      enemy.onUpdate(deltaTime);
    }
    for(uuid in this.state.bullets) {
      const bullet: Bullet = this.state.bullets[uuid];
      bullet.onUpdate(deltaTime);
    }
    for(uuid in this.state.drops) {
      const drop: Drop = this.state.drops[uuid];
      drop.onUpdate(deltaTime);
    }

    if(this.state.hasStarted() && !this.state.hasShips()) {
      console.log(`[GameRoom (${this.roomId})] Battle Lost`);
      this.broadcast('The Battle Has Been Lost');
      this.state.battleLost();
      this.disconnect();
    }

    this.spawner.onUpdate(deltaTime);
  }

  handleClientInput(client: Client, input: any): void {
    const ship: Ship = this.clientShipHash[client.id];
    ship.handleEvent('input', input);
  }

  announceNextWave() {
    this.broadcast(`Wave ${this.state.currentWave} Incoming`);
    console.log(`[GameRoom (${this.roomId})] Wave ${this.state.currentWave} Incoming`);
  }

  announceBossWave() {
    this.broadcast(`Boss Incoming`);
    console.log(`[GameRoom (${this.roomId})] Boss Incoming`)
  }

}
