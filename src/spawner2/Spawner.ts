import { GameState } from '../models/GameState';
import { GameRoom } from '../rooms/GameRoom';
import { Scout, Blaster } from '../models/enemies';
import { Pattern } from './Pattern';
import { Spawn } from './Spawn';
import { filter, sample } from 'lodash';
import { HorizontalLine, VerticalLine } from './patterns';

export class Spawner {

  private state: GameState;
  private room: GameRoom;
  private spawns: Spawn[] = [];

  private possiblePatterns: any[];

  private timer = 0;

  /**
   * Difficulty values for enemies
   * - Scout = 0.5
   * - Blaster = 2
   **/

  constructor(room: any) {
    this.room = room;
    this.state = room.state;

    this.possiblePatterns = [
      new HorizontalLine(2, Scout, 1),
      new HorizontalLine(4, Scout, 2),
      new HorizontalLine(6, Scout, 3),
      new HorizontalLine(8, Scout, 4),
      new HorizontalLine(2, Blaster, 4),
      new HorizontalLine(4, Blaster, 8),
      new HorizontalLine(6, Blaster, 12),
      new HorizontalLine(8, Blaster, 16),
      new VerticalLine(2, Scout, 1),
      new VerticalLine(4, Scout, 2),
      new VerticalLine(6, Scout, 3),
      new VerticalLine(8, Scout, 4),
    ]
  }

  onUpdate(deltaTime: number): void {

    this.timer += deltaTime / 1000;

    for(let i = this.spawns.length - 1; i >= 0; i--) {
      if(this.timer > this.spawns[i].time) {
        this.state.addEnemy(this.spawns[i].enemy);
        this.spawns.splice(i,1);
      } else {
        break;
      }
    }

    if( this.spawns.length == 0) {
      this.spawns = this.getSpawns();
      this.room.announceNextWave();
      this.timer = 0;
    }
  }

  public getSpawns(): Spawn[] {
    let patterns: any[] = [];
    let currentPatterns: any[];

    let difficulty = 15 + (this.state.currentWave * 5);
    const maxPatternDifficulty = Math.ceil(difficulty / 5);

    console.log('[Spawner] difficulty:', difficulty, ' maxPatternDifficulty:', maxPatternDifficulty)

    while( difficulty > 0 ) {
      let diff = Math.min(difficulty, maxPatternDifficulty);
      currentPatterns = filter(this.possiblePatterns, (o) => {
        return o.difficulty <= diff;
      });
      let pattern: Pattern = sample(currentPatterns);
      //console.log('[Spawner] pattern: ', pattern);
      patterns.push( pattern.clone() );
      difficulty -= pattern.difficulty;
    }
    //console.log('[Spawner] patterns', patterns);

    let spawns: Spawn[] = [];
    let timeOffset = 10; // Number of seconds between waves
    for(let i = 0, l = patterns.length; i < l; i++) {
      let s: Spawn[] = patterns[i].getSpawns(timeOffset);
      //console.log('[Spawner] spawn', s);
      spawns = spawns.concat(s);
      timeOffset += patterns[i].maxTime + Math.floor(Math.random() * 6); //add a random 0 to 5 second delay between spawns
    }

    //console.log('[Spawns] spawns', spawns);

    return spawns.sort((a: Spawn,b: Spawn) => {
      if( a.time < b.time ) {
        return -1;
      }
      if( a.time > b.time) {
        return 1;
      }
      return 0;
    });
  }

}
