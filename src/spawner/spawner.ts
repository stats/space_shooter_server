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
    this.spawnInterval = this.clock.setInterval(() => {
      this.spawn();
    }, this.timeBetweenSpawns);
  }

  stop() {
    if(this.spawnInterval) {
      this.spawnInterval.clear();
    }
  }

  spawn() {
    this.totalSpawns--;
    let enemy = new (sample(this.enemyTypes))({x: this.x, y: this.y});
    enemy.updateStats(this.wave);
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
