/**
 * This class is a list of Formations
 * that have a total difficulty score
 * equal to the required difficulty for
 * the current wave number.
 **/
export class Wave {

  state: GameState;
  difficulty: number;

  constructor(state: GameState) {
    this.state = state;
    difficulty = 15 + (this.state.currentWave * 5);
  }

  isComplete() {
    return false;
  }

  public static createWave(difficulty: number, possibleWaves:Pattern[]) {
    let waves: Wave[] = [];
    while( difficulty > 0 ) {
      possibleWaves = filter(possibleWaves, (o) => {
        return o.difficulty <= difficulty;
      });
      let wave: Wave = sample(possibleWaves);
      waves.push( wave );
      difficulty -= wave.difficulty;
    }
    return waves;
  }

}
