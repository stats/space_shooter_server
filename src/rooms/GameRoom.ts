import { Room, Delayed } from 'colyseus';
import { GameState } from '../models/gamestate';

import { JWTHelper } from '../helpers/JWTHelper';
import { CollisionHelper } from '../helpers/CollisionHelper';
import { ShipHelper } from '../helpers/ShipHelper';

import { Scout } from '../models/enemies/scout';
import { Enemy } from '../models/enemy';
import { Ship } from '../models/ship';
import { Bullet } from '../models/bullet';
import { Spawner } from '../spawner/spawner';


import { C } from '../constants';

export class GameRoom extends Room<GameState> {

  maxClients = 4;

  spawnCompleteFrequency = 1000;

  clientShipHash:any = {};

  private current_wave:number;

  private spawners_top:Spawner[];
  private spawners_left:Spawner[];
  private spawners_right:Spawner[];

  private spawnCompleteInterval:Delayed;

  onCreate(options) {
    this.current_wave = options.wave_rank;
    this.setSimulationInterval((deltaTime) => this.onUpdate(deltaTime));
    this.setState(new GameState());

    let game_start_timeout = this.clock.setInterval(() => {
      this.state.start_game -= 1;
      this.broadcast(`Battle Starts In ${this.state.start_game} Seconds`);
      if(this.state.start_game <= 0) {
        this.startWave();
        game_start_timeout.clear();
      }
    }, 1000);

  }

  async onAuth(client, options) {
    const isValidToken = await JWTHelper.verifyToken(options.token);

    if(!isValidToken) {
      this.send(client, { error: 'error_invalid_token' });
      return false;
    }

    let username = JWTHelper.extractUsernameFromToken(options.token)

    return username;
  }

  async onJoin(client, options, username) {
    let ship = await ShipHelper.getShipInGame(username);
    ship.x = 450;
    ship.y = 50;
    if(!ship) {
      this.send(client, { error: 'no_ship_in_game'});
      return;
    }
    this.clientShipHash[client.id] = ship;
    this.state.addShip(ship)
  }

  onMessage(client, data) {
    if(data.action === "input") this.handleClientInput(client, data.input);
  }

  onLeave(client) {
    let ship = this.clientShipHash[client.id]
    this.state.removeShip(ship);
    ShipHelper.removeInGame(ship.uuid)
    delete this.clientShipHash[client.id];
  }

  onDispose() {

  }

  onUpdate( deltaTime ) {
    let uuid;
    for(uuid in this.state.ships) {
      let ship:Ship = this.state.ships[uuid];
      ship.onUpdate(deltaTime);
    }
    for(uuid in this.state.enemies) {
      let enemy:Enemy = this.state.enemies[uuid];
      enemy.onUpdate(deltaTime);
    }
    for(uuid in this.state.bullets) {
      let bullet:Bullet = this.state.bullets[uuid];
      bullet.onUpdate(deltaTime);
    }
  }

  handleClientInput(client, input) {
    let ship:Ship = this.clientShipHash[client.id];
    ship.handleEvent('input', input);
  }

  /** This is the complex function that sets difficulty based on the current wave **/
  setupWave() {
    let number_of_spawners_top = Math.min(this.current_wave/2, 16);
    let number_of_spawners_side = Math.min(this.current_wave/4, 8);

    let i, x, y;

    this.spawners_top = [];
    this.spawners_left = [];
    this.spawners_right = [];

    for(i = 0; i < number_of_spawners_top; i++) {
      x = Math.floor(Math.random() * (C.BOUNDS.maxX - C.SPAWN_OFFSET)) + C.BOUNDS.minX + C.SPAWN_OFFSET;
      this.spawners_top.push(new Spawner({
          clock: this.clock,
          state: this.state,
          wave: this.current_wave,
          x: x,
          y: C.BOUNDS.maxY + C.SPAWN_OFFSET,
          timeBetweenSpans: 1000,
          timeTillStart: 0,
          totalSpawns: 5,
          enemyTypes: [Scout]
        }));
    }

    for(i = 0; i < number_of_spawners_side; i++) {
      y = Math.floor(Math.random() * (C.BOUNDS.maxY - C.SPAWN_OFFSET)/2) + (C.BOUNDS.maxY/2);
      this.spawners_left.push(new Spawner({
        clock: this.clock,
        state: this.state,
        wave: this.current_wave,
        x: -C.SPAWN_OFFSET,
        y: y,
        timeBetweenSpans: 1000,
        timeTillStart: 0,
        totalSpawns: 5,
        enemyTypes: [Scout]
      }));

      y = Math.floor(Math.random() * (C.BOUNDS.maxY - C.SPAWN_OFFSET)/2) + (C.BOUNDS.maxY/2);
      this.spawners_left.push(new Spawner({
        clock: this.clock,
        state: this.state,
        wave: this.current_wave,
        x: C.BOUNDS.maxX + C.SPAWN_OFFSET,
        y: y,
        timeBetweenSpans: 1000,
        timeTillStart: 0,
        totalSpawns: 5,
        enemyTypes: [Scout]
      }));
    }
  }

  startWave() {
    this.setupWave();
    this.broadcast(`Wave ${this.current_wave} Starting`);

    this.spawnCompleteInterval = this.clock.setInterval(() => {
      if(this.spawnsComplete()) {
        this.spawnCompleteInterval.clear();
        this.current_wave++;
        this.startWave();
      }
    }, this.spawnCompleteFrequency);
  }

  spawnsComplete():boolean {
    let spawner:Spawner;
    console.log("Checking Spawns Complete");
    for(spawner of this.spawners_top) {
      if(!spawner.complete) {
        return false;
      }
    }
    for(spawner of this.spawners_left) {
      if(!spawner.complete) {
        return false;
      }
    }
    for(spawner of this.spawners_right) {
      if(!spawner.complete) {
        return false;
      }
    }
    console.log("Spawn Complete");
    return true;
  }


}
