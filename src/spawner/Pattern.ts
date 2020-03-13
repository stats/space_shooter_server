import { TimedPosition } from './TimedPosition';
import { Spawn } from './Spawn';
import { cloneDeep } from 'lodash';

export class Pattern {

  /**
   * Points must be kept in reverse order that they will be spawned
   **/
  points: TimedPosition[];
  maxTime: number;
  enemyCount: number;
  enemyType: any;
  difficulty: number;
  positionOffset = 0;

  getSpawns(timeOffset = 0): Spawn[] {
    const spawns: Spawn[] = [];
    for(let i = this.positionOffset, l = Math.min(this.points.length, this.enemyCount); i < l; i++) {
      const point: TimedPosition = this.points[i];
      if(point == null || point.time == null) {
        console.log('[Pattern (error)] ', this.constructor.name, this.enemyType.constructor.name, i);
        continue;
      }
      const spawn: Spawn = new Spawn(
        point.time + timeOffset,
        new this.enemyType({position: point.clone()})
      )
      spawns.push(spawn);
    }
    return spawns;
  }

  clone(): Pattern {
    return cloneDeep(this);
  }

}
