import { GameRoom } from '../rooms/GameRoom';
import { Blaster, Blimp, Bomber, Fang, Hunter, Scout, Speeder, Tank, Tracker } from '../models/enemies';
import { Pattern } from './Pattern';
import { Spawn } from './Spawn';
import { filter, sample, shuffle } from 'lodash';
import { AlternatingSide, BothSideLine, DiagonalLine, DoubleVerticalLine, HorizontalLine,
         SideDiagonalLine, SideLine, TopTriangle, TripleVerticalLine, VerticalLine } from './patterns';
import { Eagle } from '../models/bosses';
import { Position } from '../models/Position';

export class Spawner {

  private state: any;
  private room: GameRoom;
  private spawns: Spawn[] = [];

  private possiblePatterns: any[];

  private bossTypes: any[] = [
    Eagle
  ]

  private bossActive = false;

  private timer = 0;

  private startWave = 0;

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

    this.startWave = this.state.currentWave;

    this.possiblePatterns = [];

    for(let i = 2; i <= 6; i++) {
      for(let j = 0; j <= 6 - i; j++) {
        this.possiblePatterns.push(new AlternatingSide(i, Bomber, i, 0, j))
        this.possiblePatterns.push(new AlternatingSide(i, Scout, Math.ceil(i/2), 0, j))
        this.possiblePatterns.push(new AlternatingSide(i, Tank, Math.ceil(i*2.5), 0, j))
      }
    }

    for(let i = 2; i <= 12; i+=2) {
      for(let j = 0; j <= 12 - i; j+=2) {
        this.possiblePatterns.push(new BothSideLine(i, Bomber, i, 0, j));
        this.possiblePatterns.push(new BothSideLine(i, Tank, Math.ceil(i * 2.5), 0, j));
        this.possiblePatterns.push(new BothSideLine(i, Fang, i * 4, -4, j));
        this.possiblePatterns.push(new BothSideLine(i, Hunter, i * 2, -4, j));
        this.possiblePatterns.push(new BothSideLine(i, Speeder, i * 2, -4, j));
        this.possiblePatterns.push(new BothSideLine(i, Tracker, i * 3, -4, j));
      }
    }

    for(let i = 2; i <= 15; i++) {
      this.possiblePatterns.push(new DiagonalLine(i, Blaster, i * 2));
      this.possiblePatterns.push(new DiagonalLine(i, Scout, Math.ceil(i/2)));
    }

    for(let i = 4; i <= 16; i += 2 ) {
      this.possiblePatterns.push(new DoubleVerticalLine(i, Scout, Math.ceil(i/2)));
    }

    for(let i = 3; i <= 15; i += 2) {
      this.possiblePatterns.push(new HorizontalLine(i, Blaster, i*2));
      this.possiblePatterns.push(new HorizontalLine(i, Scout, Math.ceil(i/2)));
    }

    for(let i = 2; i <= 6; i++) {
      this.possiblePatterns.push(new SideDiagonalLine(2, Scout, Math.ceil(i/2)));
      this.possiblePatterns.push(new SideLine(2, Scout, Math.ceil(i/2)));
    }


    for(let i = 6; i <= 24; i += 3 ) {
      this.possiblePatterns.push(new TripleVerticalLine(i, Scout, Math.ceil(i/2)));
    }

    for(let i = 2; i <= 8; i++ ) {
      this.possiblePatterns.push(new VerticalLine(i, Scout, Math.ceil(i/2)));
    }

    this.possiblePatterns = this.possiblePatterns.concat([
      new TopTriangle(3, Scout, 1),
      new TopTriangle(6, Scout, 3),
      new TopTriangle(10, Scout, 5),
    ]);

    this.spawns = this.getSpawns();

    // const selected = sample(this.bossTypes)
    // const boss = new selected();
    // this.state.addEnemy(boss);
    // this.bossActive = true;

    this.state.addEnemy(new Blaster( {position: new Position(500, 1100)}));

    this.room.announceNextWave();
    this.timer = 0;
  }

  onUpdate(deltaTime: number): void {

    if(this.bossActive) {
      if(this.state.numberEnemies() > 0) {
        return;
      } else {
          this.bossActive = false;
      }
    }

    this.timer += deltaTime / (1010 - Math.min(this.state.currentWave * 10, 700));

    if(!this.state.hasStarted()) {
      this.state.startGame = 10 - this.timer;
    }

    for(let i = this.spawns.length - 1; i >= 0; i--) {
      if(this.timer > this.spawns[i].time) {
        this.state.addEnemy(this.spawns[i].enemy);
        this.spawns.splice(i,1);
      } else {
        break;
      }
    }

    if( this.spawns.length == 0 && this.state.numberEnemies() == 0) {
      this.state.currentWave++;
      if(this.isBossWave()) {
        const selected = sample(this.bossTypes)
        const boss = new selected();
        this.state.addEnemy(boss);
        this.bossActive = true;
      } else {
        this.spawns = this.getSpawns();
        this.room.announceNextWave();
        this.timer = 0;
      }
    }
  }

  public isBossWave(): boolean {
    return (this.state.currentWave - this.startWave) % 5 == 0
  }

  public getSpawns(): Spawn[] {
    let patterns: any[] = [];
    let currentPatterns: any[];

    let difficulty = 15 + (this.state.currentWave * 5);
    const maxPatternDifficulty = Math.ceil(difficulty / 12) + 1;

    console.log('[Spawner] wave:', this.state.currentWave, 'difficulty:', difficulty, 'maxPatternDifficulty:', maxPatternDifficulty)

    while( difficulty > 0 ) {
      const diff = Math.min(difficulty, maxPatternDifficulty);
      currentPatterns = filter(this.possiblePatterns, (o) => {
        return o.difficulty <= diff;
      });
      const pattern: Pattern = sample(currentPatterns);
      patterns.push( pattern.clone() );
      difficulty -= pattern.difficulty;
    }

    patterns = shuffle(patterns);

    let spawns: Spawn[] = [];
    let timeOffset = 10; // Number of seconds between waves
    for(let i = 0, l = patterns.length; i < l; i++) {
      const s: Spawn[] = patterns[i].getSpawns(timeOffset);
      spawns = spawns.concat(s);
      timeOffset += patterns[i].maxTime + Math.floor(Math.random() * 5) - 2;  //add a random -2 to 3 second delay between spawns
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
