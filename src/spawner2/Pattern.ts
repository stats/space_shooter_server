import { TimedPosition } from './TimedPosition';

export class Pattern {

  /**
   * Points must be kept in reverse order that they will be spawned
   **/
  points: TimedPosition[];
  maxTime: number;
  enemyCount: number;
  enemyType: any;
  difficulty: number;

  getSpawns(): Spawn[] {
    let spawns:Spawn[] = [];
    for(let i = 0; l = Math.min(this.points.length, this.enemyCount); i < l; i++) {
      let point this.points[i];
      let spawn:Spawn = new Spawn(
        point.time,
        new enemyType({position: point.clone()})
      )
    }
  }

}
