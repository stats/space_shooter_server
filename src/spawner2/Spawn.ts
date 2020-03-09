import { Enemy } from '../models/Enemy';

export class Spawn {
  time: number;
  enemy: Enemy;

  constructor(time: number, enemy: Enemy ) {
    this.time = time;
    this.enemy = enemy;
  }
}
