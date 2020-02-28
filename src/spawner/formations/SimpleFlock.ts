import { Formation } from './Formation';
import { C, S } from '../../Constants';
import { Enemy } from '../../models/Enemy';
import { Position } from '../../models/Position';

export class SimpleFlock extends Formation {

  onSpawnEnemies(spawnType: Enemy, allowedSides?: number[]): void {

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

    const start: Position = new Position(0,0)
    const destination: Position = new Position(0,0);

    switch(this.getRandomSide(allowedSides)) {
      case S.TOP:
        start.x = this.randomX();
        start.y = this.topOffset() + C.SPAWN_OFFSET * 5;
        destination.x = this.randomX();
        destination.y = -C.SPAWN_OFFSET * 5;
        break;
      case S.LEFT:
        start.x = this.leftOffset() - C.SPAWN_OFFSET * 5;
        start.y = this.randomY();
        destination.x = this.rightOffset() + C.SPAWN_OFFSET * 5;
        destination.y = this.randomY()
        break;
      case S.RIGHT:
        start.x = this.rightOffset() + C.SPAWN_OFFSET * 5;
        start.y = this.randomY();
        destination.x = -C.SPAWN_OFFSET * 5;
        destination.y = this.randomY();
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
