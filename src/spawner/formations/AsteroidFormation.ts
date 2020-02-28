import { Formation } from './Formation';
import { C } from '../../Constants';
import { Enemy } from '../../models/Enemy';

export class AsteroidFormation extends Formation {

  onSpawnEnemies(spawnType: Enemy, ): void {

    let i: number, spawns: number;
    spawns = 2;
    if(this.state.currentWave > 3) {
      spawns = 3;
    } else if (this.state.currentWave > 5 ) {
      spawns = 4;
    } else if (this.state.currentWave > 7 ) {
      spawns = 5;
    } else if (this.state.currentWave > 10 ) {
      spawns = 6;
    } else if (this.state.currentWave > 15 ) {
      spawns = 7;
    } else if (this.state.currentWave > 20 ) {
      spawns = 8;
    }

    let startX: number, startY: number;

    for(i = 0; i < spawns; i++) {
      startX = this.randomX();
      startY = this.topOffset() + (Math.random() * C.SPAWN_OFFSET * 3);
      this.state.addEnemy(new spawnType({x: startX , y: startY }));
    }
  }

}
