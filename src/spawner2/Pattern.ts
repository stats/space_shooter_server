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

  getSpawns(timeOffset: number = 0): Spawn[] {
    let spawns:Spawn[] = [];
    for(let i = 0, l = Math.min(this.points.length, this.enemyCount); i < l; i++) {
      let point: TimedPosition = this.points[i];
      let spawn:Spawn = new Spawn(
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
