import { GameState } from '../models/GameState';
import { GameRoom } from '../rooms/GameRoom';
import { Blaster, Blimp, Bomber, Fang, Hunter, Scout, Speeder, Tank, Tracker } from '../models/enemies';
import { Pattern } from './Pattern';
import { Spawn } from './Spawn';
import { filter, sample } from 'lodash';
import { AlternatingLeftSide, AlternatingRightSide, BothSideLine, HorizontalLine, LeftSideLine, RightSideLine, VerticalLine } from './patterns';

export class Spawner {

  private state: GameState;
  private room: GameRoom;
  private spawns: Spawn[] = [];

  private possiblePatterns: any[];

  private timer = 0;

  /**
   * Difficulty values for enemies
   * - Blaster = 2
   * - Blimp = 0.5
   * - Bomber = 1
   * - Fang = 4
   * - Hunter = 2
   * - Scout = 0.5
   * - Speeder = 2
   * - Tank = 2.5
   * - Tracker = 3
   **/

  constructor(room: any) {
    this.room = room;
    this.state = room.state;

    this.possiblePatterns = [

      new HorizontalLine(2, Blaster, 4),
      new HorizontalLine(4, Blaster, 8),
      new HorizontalLine(6, Blaster, 12),
      new HorizontalLine(8, Blaster, 16),

      new AlternatingLeftSide(2, Bomber, 4),
      new AlternatingLeftSide(2, Bomber, 4, 0, 1),
      new AlternatingLeftSide(2, Bomber, 4, 0, 2),
      new AlternatingLeftSide(3, Bomber, 6),
      new AlternatingLeftSide(3, Bomber, 6, 0, 1),
      new AlternatingLeftSide(4, Bomber, 8),
      new AlternatingRightSide(2, Bomber, 4),
      new AlternatingRightSide(2, Bomber, 4, 0, 1),
      new AlternatingRightSide(2, Bomber, 4, 0, 2),
      new AlternatingRightSide(3, Bomber, 6),
      new AlternatingRightSide(3, Bomber, 6, 0, 1),
      new AlternatingRightSide(4, Bomber, 8),
      new BothSideLine(2, Bomber, 4),
      new BothSideLine(2, Bomber, 4, 0, 2),
      new BothSideLine(2, Bomber, 4, 0, 4),
      new BothSideLine(4, Bomber, 8),
      new BothSideLine(4, Bomber, 8, 0, 2),
      new BothSideLine(6, Bomber, 12),
      new BothSideLine(8, Bomber, 16),

      new BothSideLine(2, Fang, 8, -4, 0),
      new BothSideLine(2, Fang, 8, -4, 2),
      new BothSideLine(2, Fang, 8, -4, 4),
      new BothSideLine(4, Fang, 16, -4, 0),
      new BothSideLine(4, Fang, 16, -4, 2),

      new BothSideLine(2, Hunter, 6, -4, 0),
      new BothSideLine(2, Hunter, 6 -4, 2),
      new BothSideLine(2, Hunter, 6, -4, 4),
      new BothSideLine(4, Hunter, 12, -4, 0),
      new BothSideLine(4, Hunter, 12, -4, 2),

      new HorizontalLine(2, Scout, 1),
      new HorizontalLine(4, Scout, 2),
      new HorizontalLine(6, Scout, 3),
      new HorizontalLine(8, Scout, 4),
      new VerticalLine(2, Scout, 1),
      new VerticalLine(4, Scout, 2),
      new VerticalLine(6, Scout, 3),
      new VerticalLine(8, Scout, 4),
      new LeftSideLine(2, Scout, 1),
      new LeftSideLine(3, Scout, 2),
      new LeftSideLine(4, Scout, 4),
      new RightSideLine(2, Scout, 1),
      new RightSideLine(3, Scout, 2),
      new RightSideLine(4, Scout, 4),

      new BothSideLine(2, Speeder, 4, -4, 0),
      new BothSideLine(2, Speeder, 4 -4, 2),
      new BothSideLine(2, Speeder, 4, -4, 4),
      new BothSideLine(4, Speeder, 8, -4, 0),
      new BothSideLine(4, Speeder, 8, -4, 2),

      new AlternatingLeftSide(2, Tank, 5),
      new AlternatingLeftSide(2, Tank, 5, 0, 1),
      new AlternatingLeftSide(2, Tank, 5, 0, 2),
      new AlternatingLeftSide(3, Tank, 8),
      new AlternatingLeftSide(3, Tank, 8, 0, 1),
      new AlternatingLeftSide(4, Tank, 10),
      new AlternatingRightSide(2, Tank, 5),
      new AlternatingRightSide(2, Tank, 5, 0, 1),
      new AlternatingRightSide(2, Tank, 5, 0, 2),
      new AlternatingRightSide(3, Tank, 8),
      new AlternatingRightSide(3, Tank, 8, 0, 1),
      new AlternatingRightSide(4, Tank, 10),
      new BothSideLine(2, Tank, 5),
      new BothSideLine(2, Tank, 5, 0, 2),
      new BothSideLine(2, Tank, 5, 0, 4),
      new BothSideLine(4, Tank, 10),
      new BothSideLine(4, Tank, 10, 0, 2),
      new BothSideLine(6, Tank, 15),
      new BothSideLine(8, Tank, 20),

      new BothSideLine(2, Tracker, 6, -4, 0),
      new BothSideLine(2, Tracker, 6, -4, 2),
      new BothSideLine(2, Tracker, 6, -4, 4),
      new BothSideLine(4, Tracker, 12, -4, 0),
      new BothSideLine(4, Tracker, 12, -4, 2),
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
    const maxPatternDifficulty = Math.ceil(difficulty / 12) + 1;

    console.log('[Spawner] wave:', this.state.currentWave, 'difficulty:', difficulty, 'maxPatternDifficulty:', maxPatternDifficulty)

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
        return 1;
      }
      if( a.time > b.time) {
        return -1;
      }
      return 0;
    });
  }

}
