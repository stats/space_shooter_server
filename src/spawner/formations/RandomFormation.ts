import { Formation } from './Formation';
import { C, S } from '../../Constants';
import { Enemy } from '../../models/Enemy';
import { Position } from '../../models/Position';

export class RandomFormation extends Formation {

  onSpawnEnemies(spawnType: any, allowedSides?: number[]): void {

    let i: number, spawns: number;
    spawns = 3;
    if(this.state.currentWave > 5) {
      spawns = 4;
    } else if (this.state.currentWave > 10 ) {
      spawns = 5;
    } else if (this.state.currentWave > 15 ) {
      spawns = 6;
    } else if (this.state.currentWave > 20 ) {
      spawns = 8;
    } else if (this.state.currentWave > 25 ) {
      spawns = 10;
    } else if (this.state.currentWave > 30 ) {
      spawns = 12;
    }

    for(i = 0; i < spawns; i++) {
      const side: number = this.getRandomSide(allowedSides);;
      let position: Position;
      switch(side) {
        case S.TOP:
          position = new Position(
            this.randomX(),
            this.topOffset() + (Math.random() * C.SPAWN_OFFSET * 5)
          );
          break;
        case S.LEFT:
          position = new Position(
            this.leftOffset() - (Math.random() * C.SPAWN_OFFSET * 5),
            this.randomY()
          );
          break;
        case S.RIGHT:
          position = new Position(
            this.rightOffset() + (Math.random() * C.SPAWN_OFFSET * 5),
            this.randomY()
          );
          break;
      }
      this.state.addEnemy(new spawnType({position}));
    }
  }

}
