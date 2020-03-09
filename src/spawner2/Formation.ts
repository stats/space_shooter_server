import { Pattern } from './patterns/Pattern';


/**
 * This class may go away if we can merge this into Wave.ts
 * and then provide a method to merge Patterns
 **/

export class Formation {

  state: GameState;
  spawns: Spawn[];

  timer = 0;
  complete = false;
  maxTime: number;

  constructor(state: GameState, pattern: Pattern) {
    this.state = state;
    this.spawns = pattern.getSpawns();
    this.maxTime = pattern.maxTime;
  }

  onUpdate(deltatime: number): void {
    if(this.complete) return;
    this.timer += deltaTime / 1000;

    for( let i = l-1; i >= 0; i--) {
      let spawn = this.spawns[i];
      if(this.timer > spawn.time) {
        this.state.addEnemy(spawn.enemy);
        this.spawns.splice(i,1);
      } else {
        return;
      }
    }

    if(this.spawns.length == 0 && this.timer > this.maxTime) {
      this.complete = true;
    }
  }
}
