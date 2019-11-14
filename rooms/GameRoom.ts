import { Room, Delayed } from 'colyseus';
import { GameState } from '../models/gamestate';

import { JWTHelper } from '../helpers/JWTHelper';
import { CollisionHelper } from '../helpers/CollisionHelper';
import { ShipHelper } from '../helpers/ShipHelper';

export class GameRoom extends Room<GameState> {

  maxClients = 4;

  spawnCompleteFrequency = 1000;

  clientShipHash:any = {};

  private current_wave:number;

  private spawners_top:[Spawner];
  private spawners_left:[Spawner];
  private spawners_right:[Spawner];

  private spawnCompleteInterval:Delayed;

  private collision:CollisionHelper;

  onCreate(options) {
    this.collisionHelper = new CollisionHelper();
    this.current_wave = options.wave_rank;
    this.setSimulationINterval((deltaTime) => this.onUpdate(deltaTime));
    this.setState(new State());

    let game_start_timeout = this.clock.setInterval(() => {
      this.state.start_game -= 1;
      if(this.state.start_game <= 0) {
        this.startGame();
        game_start_timeout.clear();
      }
    }, 1000);

  }

  onAuth(client, options) {
    const isValidToken = await JWTHelper.verifyToken(options.token);

    if(!isValidToken) {
      this.send(client, { error: 'error_invalid_token' });
      return false;
    }

    let username = JWTHelper.extractUsernameFromToken(options.token)

    return username;
  }

  onJoin(client, options, username) {
    let ship = ShipHelper.getShipInGame(username);
    if(!ship) {
      this.send(client, { error: 'no_ship_in_game'});
      return;
    }
    this.clientShipHash[client.id] = ship;
    this.state.addShip(ship)
  }

  onMessage(client, data) {

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

    this.checkCollisions();

    let i, l;
    for(let ship of this.state.ships) {
      ship.onUpdate(deltaTime);
    }
    for(let enemy of this.state.enemies) {
      enemy.onUpdate(deltaTime);
    }
    for(let bullet of this.state.bullets) {
      bullet.onUpdate(deltaTime);
    }
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
      x = ( i * C.SPAWN_TOP / number_of_spawners_top ) + 32;
      this.spawners_top.push(new Spawner({
          clock: this.clock,
          state: this.state,
          wave: this.current_wave,
          x: x,
          y: -C.SPAWN_OFFSET,
          timeBetweenSpans: 1000,
          timeTillStart: 0,
          totalSpawns: 5,
          enemyTypes: [Scout]
        }));
    }

    for(i = 0; i < number_of_spawners_side; i++) {
      y = ( i * C.SPAWN_TOP / number_of_spawners_side) + 32;
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
      this.spawners_left.push(new Spawner({
        clock: this.clock,
        state: this.state,
        wave: this.current_wave,
        x: C.SPAWN_TOP + C.SPAWN_OFFSET;,
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

    this.spawnsCompleteInterval = this.clock.setInterval(() => {
      if(this.spawnersComplete()) {
        this.spawnCompleteInterval.clear();
        this.current_wave++;
        this.startWave();
      }
    }, this.spawnCompleteFrequency);
  }

  spawnsComplete():boolean {
    let spawner;
    for(spawner of this.spawners_top) {
      if(!spawner.complete) return false;
    }
    for(spawner of this.spawners_left) {
      if(!spawner.complete) return false;
    }
    for(spawner of this.spawners_right) {
      if(!spawner.complete) return false;
    }
    return true;
  }


}
