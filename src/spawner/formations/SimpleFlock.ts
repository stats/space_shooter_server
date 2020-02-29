import { Formation } from './Formation';
import { C, S } from '../../Constants';
import { Position } from '../../models/Position';
import { Enemy } from '../../models/Enemy';

export class SimpleFlock extends Formation {

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

    let start: Position;
    let destination: Position;

    switch(this.getRandomSide(allowedSides)) {
      case S.TOP:
        start = new Position(
          this.randomX(),
          this.topOffset() + C.SPAWN_OFFSET * 5
        );
        destination = new Position(
          this.randomX(),
          -C.SPAWN_OFFSET * 5
        );
        break;
      case S.LEFT:
        start = new Position(
          this.leftOffset() - C.SPAWN_OFFSET * 5,
          this.randomY()
        );
        destination = new Position(
          this.rightOffset() + C.SPAWN_OFFSET * 5,
          this.randomY()
        );
        break;
      case S.RIGHT:
        start = new Position(
          this.rightOffset() + C.SPAWN_OFFSET * 5,
          this.randomY()
        );
        destination = new Position(
          -C.SPAWN_OFFSET * 5,
          this.randomY()
        );
        break;
    }

    const flock: Enemy[] = [];
    for(i = 0; i < spawns; i++) {
      flock[i] = new spawnType();
    }

    for(i = 0; i < spawns; i++) {
      flock[i].position.x = start.x + (Math.random() * C.SPAWN_OFFSET * 4) - C.SPAWN_OFFSET*2;
      flock[i].position.y = start.y + (Math.random() * C.SPAWN_OFFSET * 4) - C.SPAWN_OFFSET*2;
      flock[i].destination = destination;
      flock[i].flock = flock;

      this.state.addEnemy(flock[i]);
    }
  }

}
