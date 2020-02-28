import { Formation } from './Formation';
import { C, S } from '../../Constants';

export class RandomFormation extends Formation {

  onSpawnEnemies(spawnTpe: any, allowedSides?: number[]) {

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
      const side: number;
      let startX: number, startY: number;
      side = this.getRandomSide(allowedSides);
      switch(side) {
        case S.TOP:
          startX = this.randomX();
          startY = this.topOffset() + (Math.random() * C.SPAWN_OFFSET * 5);
          break;
        case S.LEFT:
          startX = this.leftOffset() - (Math.random() * C.SPAWN_OFFSET * 5);
          startY = this.randomY();
          break;
        case S.RIGHT:
          startX = this.rightOffset() + (Math.random() * C.SPAWN_OFFSET * 5);
          startY = this.randomY();
          break;
      }
      this.state.addEnemy(new spawnTpe({x: startX , y: startY }));
    }
  }

}
