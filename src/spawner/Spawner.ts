import Clock from '@gamestdio/timer';

import { Asteroid, Blaster, Blaster2, Blimp, Bomber, Fang, Hunter, Scout, Speeder, Tank, Tracker } from '../models/enemies';
import { Eagle } from '../models/bosses';
import { AsteroidFormation, LineFormation, RandomFormation, SquareFormation,
         TriangleFormation, DiagonalFormation, SimpleFlock } from './Formations/';

import { GameState} from '../models/GameState';

import { sample } from 'lodash';

export class Spawner {

  private state: GameState;
  private clock: Clock;

  private numberOfFormations = 0;

  private boss_types: any = [
    [1, Eagle],
  ]

  private enemy_types: any = [
    [1, Asteroid],
    [1, Blaster],
    [1, Blaster2],
    [1, Blimp],
    [1, Bomber],
    [1, Fang],
    [1, Hunter],
    [1, Scout],
    [1, Speeder],
    [1, Tank],
    [1, Tracker]
  ];

  private formations: any = [LineFormation, RandomFormation, SquareFormation, TriangleFormation, DiagonalFormation];

  private possibleEnemies: Array<any>;

  private minFormations = 1;
  private maxFormations = 1;

  constructor( state: GameState, clock: Clock ) {
    this.state = state;
    this.clock = clock;
  }

  isBossWave(): boolean {
    return true;
    return this.state.startWave != this.state.currentWave && (this.state.currentWave - this.state.startWave) % 5 == 0;
  }

  nextWave(): void {
    if( this.isBossWave() ) {
      let possibleBosses = [];
      for(const item of this.boss_types) {
        if(this.state.currentWave >= item[0]) {
          possibleBosses.push(item[1]);
        } else {
          break;
        }
      }
      const boss: any = sample(possibleBosses);
      this.state.addEnemy(new boss());
    } else {
      this.numberOfFormations = (this.state.currentWave + 3);
      this.possibleEnemies = [];
      this.minFormations = Math.ceil(this.state.currentWave / 10);
      this.maxFormations = Math.ceil(this.state.currentWave / 6);
      for(const item of this.enemy_types) {
        if(this.state.currentWave >= item[0]) {
          this.possibleEnemies.push(item[1]);
        } else {
          break;
        }
      }
      this.spawnFormation();
    }
  }

  public complete(): boolean {
    return this.numberOfFormations == 0;
  }

  spawnFormation(): void {
    const formations = Math.min((Math.random() * (this.maxFormations - this.minFormations)) + this.minFormations, this.numberOfFormations);
    for(let i = 0; i < formations; i++) {
      const enemy = sample(this.possibleEnemies);
      let formation;
      switch(enemy) {
        case Asteroid:
          formation = new AsteroidFormation(this.state);
        break;
        case Blimp:
          formation = new SimpleFlock(this.state);
        break;
        default:
          formation = new (sample(this.formations))(this.state);
        break;
      }
      console.log('Spawned Formation:', formation.constructor.name);
      formation.onSpawnEnemies(enemy);
      this.numberOfFormations--;
    }
    if(this.numberOfFormations > 0) {
      this.clock.setTimeout(() => {
        this.spawnFormation();
      }, (Math.random() * 6000) + 4000);
    }
  }
}
