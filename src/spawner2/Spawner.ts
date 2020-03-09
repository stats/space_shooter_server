import { GameState } from '../models/GameState';
import { GameRoom } from '../rooms/GameRoom';
import { Blaster, Blimp, Bomber, Fang, Hunter, Scout, Speeder, Tank, Tracker } from '../models/enemies';
import { Pattern } from './Pattern';
import { Spawn } from './Spawn';
import { filter, sample, shuffle } from 'lodash';
import { AlternatingLeftSide, AlternatingRightSide, BothSideLine, DiagonalLine, DoubleVerticalLine, HorizontalLine,
         LeftSideDiagonalLine, LeftSideLine, RightSideDiagonalLine, RightSideLine, TopTriangle, TripleVerticalLine, VerticalLine } from './patterns';

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
      new DiagonalLine(2, Blaster, 4),
      new DiagonalLine(4, Blaster, 8),
      new DiagonalLine(6, Blaster, 12),
      new DiagonalLine(8, Blaster, 16),

      new AlternatingLeftSide(2, Bomber, 2),
      new AlternatingLeftSide(2, Bomber, 2, 0, 1),
      new AlternatingLeftSide(2, Bomber, 2, 0, 2),
      new AlternatingLeftSide(3, Bomber, 3),
      new AlternatingLeftSide(3, Bomber, 3, 0, 1),
      new AlternatingLeftSide(4, Bomber, 4),
      new AlternatingRightSide(2, Bomber, 2),
      new AlternatingRightSide(2, Bomber, 2, 0, 1),
      new AlternatingRightSide(2, Bomber, 2, 0, 2),
      new AlternatingRightSide(3, Bomber, 3),
      new AlternatingRightSide(3, Bomber, 3, 0, 1),
      new AlternatingRightSide(4, Bomber, 4),
      new BothSideLine(2, Bomber, 2),
      new BothSideLine(2, Bomber, 2, 0, 2),
      new BothSideLine(2, Bomber, 2, 0, 4),
      new BothSideLine(4, Bomber, 4),
      new BothSideLine(4, Bomber, 4, 0, 2),
      new BothSideLine(6, Bomber, 6),
      new BothSideLine(8, Bomber, 8),

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
      new DiagonalLine(2, Scout, 1),
      new DiagonalLine(4, Scout, 2),
      new DiagonalLine(6, Scout, 3),
      new DiagonalLine(8, Scout, 4),
      new LeftSideDiagonalLine(2, Scout, 1),
      new LeftSideDiagonalLine(3, Scout, 2),
      new LeftSideDiagonalLine(4, Scout, 4),
      new RightSideDiagonalLine(2, Scout, 1),
      new RightSideDiagonalLine(3, Scout, 2),
      new RightSideDiagonalLine(4, Scout, 4),
      new TopTriangle(3, Scout, 1),
      new TopTriangle(6, Scout, 3),
      new TopTriangle(10, Scout, 5),
      new DoubleVerticalLine(2, Scout, 2),
      new DoubleVerticalLine(4, Scout, 4),
      new DoubleVerticalLine(6, Scout, 6),
      new DoubleVerticalLine(8, Scout, 8),
      new DoubleVerticalLine(10, Scout, 10),
      new DoubleVerticalLine(12, Scout, 12),
      new DoubleVerticalLine(14, Scout, 14),
      new DoubleVerticalLine(16, Scout, 16),
      new TripleVerticalLine(3, Scout, 3),
      new TripleVerticalLine(6, Scout, 6),
      new TripleVerticalLine(9, Scout, 9),
      new TripleVerticalLine(12, Scout, 12),
      new TripleVerticalLine(15, Scout, 15),
      new TripleVerticalLine(18, Scout, 18),
      new TripleVerticalLine(21, Scout, 21),
      new TripleVerticalLine(24, Scout, 24),

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
      patterns.push( pattern.clone() );
      difficulty -= pattern.difficulty;
    }

    patterns = shuffle(patterns);

    let spawns: Spawn[] = [];
    let timeOffset = 10; // Number of seconds between waves
    for(let i = 0, l = patterns.length; i < l; i++) {
      let s: Spawn[] = patterns[i].getSpawns(timeOffset);
      spawns = spawns.concat(s);
      timeOffset += patterns[i].maxTime + Math.floor(Math.random() * 6);  //add a random 0 to 5 second delay between spawns
      timeOffset = Math.max(timeOffset, 10); //ensure that the delay is never less than 10 seconds
    }


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
