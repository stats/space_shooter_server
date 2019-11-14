import { Schema, type } from "@colyseus/schema";
import { GameState } from './GameState';

import { CollidesWithShipBullet } from '../behaviours/enemy/CollidesWithShipBullet';

import { Entity } from './entity';

export class Enemy extends Entity {
  health:number = 1;
  health_base:number = 1;
  health_growth:number = 0.1;

  speed:number = 1;
  speed_base:number = 1;
  speed_growth:number = 0.1;

  collision_damage:number = 1;
  collision_damage_base:number = 1;
  collision_damage_growth:number = 0.1;

  wave:number;

  constructor(options) {
    super(options);


  }

  updateStats(wave) {
    this.health = this.health_base + (this.health_growth * wave);
    this.speed = this.speed_base + (this.speed_growth * wave);
    this.collision_damage = this.collision_damage_base + (this.collision_damage_growth * wave);
  }

  destroy() {
    this.$state.removeEnemy(this);
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviour(new CollidesWithShipBullet(this, this.$state));
  }
}
