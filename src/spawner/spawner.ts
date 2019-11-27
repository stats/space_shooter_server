import { Delayed } from 'colyseus';
import Clock from '@gamestdio/timer';

import { Enemy } from '../models/enemy';
import { GameState} from '../models/GameState';

import { sample } from 'lodash';

export class Spawner {
  x:number;
  y:number;

  state:GameState;

  timeBetweenSpawns:number;
  timeTillStart:number;

  totalSpawns:number;
  enemyTypes:Enemy[];

  clock:Clock;

  wave:number;

  spawnInterval:Delayed;

  complete:boolean = false;

  constructor(options) {
    this.clock = options.clock;
    this.state = options.state;
    this.wave = options.wave;
    this.x = options.x;
    this.y = options.y;
    this.timeBetweenSpawns = options.timeBetweenSpawns || 1500;
    this.timeTillStart = options.timeTillStart || 1000;
    this.totalSpawns = options.totalSpawns || 0;
    this.enemyTypes = options.enemyTypes || [];

    this.clock.setTimeout(() => {
      this.start();
    }, this.timeTillStart);
  }

  start() {
    console.log("Spawner Started:", this.totalSpawns, "total spawns (", this.x, ",", this.y, ")");
    this.spawnInterval = this.clock.setInterval(() => {
      this.spawn();
    }, this.timeBetweenSpawns);
  }

  spawn() {
    this.totalSpawns--;
    let enemy = new (sample(this.enemyTypes))();
    enemy.updateStats(this.wave);
    enemy.x = this.x;
    enemy.y = this.y;
    this.state.addEnemy(enemy);
    this.checkSpawnInterval();
  }

  checkSpawnInterval() {
    if(this.totalSpawns <= 0) {
      this.complete = true;
      this.spawnInterval.clear();
    }
  }
}
