import { type } from "@colyseus/schema";
import { GameState, Entity, Position, CollidesWithShipBullet, EnemyDestroyedBehaviour, EnemyTakesDamageBehaviour } from '../Internal';

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

  damage = 1;
  damageBase = 1;
  damageGrowth = 0.2;

  range = 300;
  rangeBase = 300;
  rangeGrowth = 25;

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
    this.speed = Math.min(Math.floor(this.speedBase + (this.speedGrowth * wave)), 350); // Don't let speed go over 350 that might get a bit silly
    this.collisionDamage = Math.floor(this.collisionDamageBase + (this.collisionDamageGrowth * wave));
    this.damage = Math.floor(this.damageBase + (this.damageGrowth * wave));
    this.range = Math.floor(this.rangeBase + ( this.rangeGrowth * wave ));
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("collides_ship_bullet", new CollidesWithShipBullet(this));
    this.registerBehaviour("destroyed", new EnemyDestroyedBehaviour(this));
    this.registerBehaviour("takes_damage", new EnemyTakesDamageBehaviour(this));
    this.updateStats(state.currentWave);
  }
}
