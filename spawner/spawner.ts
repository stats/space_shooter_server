import { ClockTimer, Delayed } from 'colyseus';
import { sample } from 'lodash';

export class Spawner {
  x:number;
  y:number;

  state:GameState;

  timeBetweenSpawns:number;
  timeTillStart:number;

  totalSpawns:number;
  enemyTypes:[Enemy];

  clock:ClockTimer;

  wave:number;

  spawnInterval:Delayed;

  complete:boolean = false;

  constructor(options) {
    this.clock = options.clock;
    this.state = options.state;
    this.wave = options.wave;
    this.x = options.x;
    this.y = options.y;
    this.timeBetweenSpawns = options.timeBetweenSpawns || 500;
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

  spawn() {
    this.totalSpawns--;
    let enemy = new sample(this.enemyTypes)({wave: this.current_wave});
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
