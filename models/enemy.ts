import { Schema, type } from "@colyseus/schema";
import { GameRoom } from '../rooms/GameRoom';

import { CollidesWithEnemyBullet } from '../behaviours/player/CollidesWithShipBullet';

import { Entity } from './entity';

export class Enemy extends Entity {
  health:number = 1;
  health_growth:number = 0.1;

  speed:number = 1;
  speed_growth:number = 0.1;

  collision_damage:number = 1;
  collision_damage_growth:number = 0.1;

  wave:number;

  constructor(options) {
    this.wave = options.wave || 0;

    this.health = this.health + (this.health_growth * this.wave);
    this.speed = this.speed + (this.speed_growth * this.wave);
    this.collision_damage = this.collision_damage + (this.collision_damage_growth * this.wave);
  }

  destroy() {
    this.$room.state.removeEnemy(this);
  }

  onInitGame(room:GameRoom) {
    super.onInitGame(room);
    this.registerBehaviour(new CollidesWithShipBullet(this, this.$room.state.bullets));
  }
}
