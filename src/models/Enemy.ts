import { type } from "@colyseus/schema";
import { GameState } from './GameState';
import { Position } from './Position';

import { CollidesWithShipBullet } from '../behaviours/Enemy/CollidesWithShipBullet';
import { DestroyedBehaviour } from '../behaviours/Enemy/DestroyedBehaviour';
import { TakesDamageBehaviour } from '../behaviours/Enemy/TakesDamageBehaviour';

import { Entity } from './Entity';

export class Enemy extends Entity {
  health = 1;
  healthBase = 1;
  healthGrowth = 0.1;

  speed = 1;
  speedBase = 1;
  speedGrowth = 0.1;

  collisionDamage = 1;
  collisionDamageBase = 1;
  collisionDamageGrowth = 0.1;

  flock: Enemy[];
  destination: Position;
  velocity: Position;

  @type("string")
  modelType = "";

  wave: number;

  constructor(options: any) {
    super(options);
  }

  updateStats(wave: number): void {
    this.health = Math.floor(this.healthBase + (this.healthGrowth * wave));
    this.speed = Math.floor(this.speedBase + (this.speedGrowth * wave));
    this.collisionDamage = Math.floor(this.collisionDamageBase + (this.collisionDamageGrowth * wave));
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("collides_ship_bullet", new CollidesWithShipBullet(this));
    this.registerBehaviour("destroyed", new DestroyedBehaviour(this));
    this.registerBehaviour("takes_damage", new TakesDamageBehaviour(this));
    this.updateStats(state.currentWave);
  }
}
