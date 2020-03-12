import { Entity } from './Entity';
import { GameState } from './GameState';
import { DestroyedBehaviour } from '../behaviours/drop/DestroyedBehaviour';
import { Crystals } from '../Crystals';

export class Drop extends Entity {

  speed: number = 65;
  radius: number = 25;

  /** This will need to be a type **/
  type([TempUpgrade])
  tempUpgrades: TempUpgrade[];

  constructor(options) {
    super(options);
    const r = Math.random() * 4;
    let upgradeIndex: number[];

    switch(r) {
      case 0:
        upgradeIndex = this.getRandomNumbers(Crystals.RED.length);
        this.tempUpgrades[0] = new TempUpgrade(Crystals.RED[upgradeIndex[0]]);
      break;
      case 1:
        upgradeIndex = this.getRandomNumbers(Crystals.BLUE.length);
        this.tempUpgrades[0] = new TempUpgrade(Crystals.BLUE[upgradeIndex[0]]);
      break;
      case 2:
        upgradeIndex = this.getRandomNumbers(Crystals.GREEN.length);
        this.tempUpgrades[0] = new TempUpgrade(Crystals.GREEN[upgradeIndex[0]]);
      break;
      case 3:
        upgradeIndex = this.getRandomNumbers(Crystals.PURPLE.length);
        this.tempUpgrades[0] = new TempUpgrade(Crystals.PURPLE[upgradeIndex[0]]);
      break;
    }
  }

  private getRandomNumbers(array: any): number[] {
    const u1: number;
    let u2: number, u3: number;

    u1 = Math.random() * array.length;
    u2 = Math.random() * array.length;
    u3 = Math.random() * array.length;
    while(u2 == u1){
      u2 = Math.random() * array.length;
    }
    while(u3 == u2 || u3 == u1) {
      u3 = Math.random() * array.length;
    }
    return [u1, u2, u3];
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("destroyed", new DestroyedBehaviour(this));
  }

}
