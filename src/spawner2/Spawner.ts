import { GameState } from '../models/GameState';
import { Scout } from '../models/enemies';

export class Spawner {

  private state: GameState;
  private wave: Wave;

  private possibleWaves: Wave[];

  constructor(state: GameState) {
    this.state = state;
    this.wave = this.getNewWave();

    this.possibleWaves = [
      new HorizontalLine(2, Scout, 1),
      new HorizontalLine(4, Scout, 2),
      new HorizontalLine(6, Scout, 3),
      new HorizontalLine(8, Scout, 4),
    ]
  }

  onUpdate(deltaTime: number): void {

    this.wave.onUpdate(deltaTime);

    if(this.wave.isComplete() ) {
      this.wave = this.getNewWave();
    }
  }

  private getNewWave(): Wave {

  }

}
