import { Delayed } from 'colyseus';
import Clock from '@gamestdio/timer';

import { Enemy } from '../models/enemy';
import { Scout } from '../models/enemies/Scout';
import { Hunter } from '../models/enemies/Hunter';
import { Blaster } from '../models/enemies/Blaster';
import { Blimp } from '../models/enemies/Blimp';
import { Bomber } from '../models/enemies/Bomber';
import { Speeder } from '../models/enemies/Speeder';
import { Tracker } from '../models/enemies/Tracker';
import { GameState} from '../models/GameState';
import { Position } from '../models/position';
import { LineFormation } from './formations/LineFormation';
import { RandomFormation } from './formations/RandomFormation';
import { SquareFormation } from './formations/SquareFormation';
import { TriangleFormation } from './formations/TriangleFormation';
import { DiagonalFormation } from './formations/DiagonalFormation';
import { SimpleFlock } from './formations/SimpleFlock';

import { sample } from 'lodash';

export class Spawner {

  private state:GameState;
  private clock:Clock;

  private number_of_formations:number = 0;

  private enemy_types:any = [
    // [1, Scout],
    [1, Blimp],
    // [1, Bomber],
    // [1, Hunter],
    // [1, Speeder],
    // [1, Blaster],
    // [1, Tracker]
  ];

  private formations:any = [LineFormation, RandomFormation, SquareFormation, TriangleFormation, DiagonalFormation];

  private possible_enemies:any;

  private min_formations = 1;
  private max_formations = 1;

  constructor(state:GameState, clock:Clock) {
    this.state = state;
    this.clock = clock;
  }

  nextWave() {
    this.number_of_formations = (this.state.current_wave + 3);
    this.possible_enemies = [];
    this.min_formations = Math.ceil(this.state.current_wave / 10);
    this.max_formations = Math.ceil(this.state.current_wave / 6);
    for(let item of this.enemy_types) {
      if(this.state.current_wave >= item[0]) {
        this.possible_enemies.push(item[1]);
      } else {
        break;
      }
    }
    this.spawnFormation();
  }

  public complete() {
    return this.number_of_formations == 0;
  }

  spawnFormation() {
    let formations = Math.min((Math.random() * (this.max_formations - this.min_formations)) + this.min_formations, this.number_of_formations);
    for(let i = 0; i < formations; i++) {
      let enemy = sample(this.possible_enemies);
      let formation;
      if(enemy === Blimp) {
        formation = new SimpleFlock(this.state);
      } else {
        formation = new (sample(this.formations))(this.state);
      }
      console.log('Spawned Formation:', formation.constructor.name);
      formation.onSpawnEnemies(enemy);
      this.number_of_formations--;
    }
    if(this.number_of_formations > 0) {
      this.clock.setTimeout(() => {
        this.spawnFormation();
      }, (Math.random() * 6000) + 4000);
    }
  }
}
