import { Schema, type, MapSchema } from '@colyseus/schema';

import { Ship } from './Ship';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';

import { CollisionHelper } from '../helpers/CollisionHelper';

export class GameState extends Schema {

  @type({map:Ship})
  ships = new MapSchema<Ship>();

  @type({map:Enemy})
  enemies = new MapSchema<Enemy>();

  @type({map:Bullet})
  bullets = new MapSchema<Bullet>();

  @type("number")
  startGame = 5; //number of seconds until the game starts

  @type("int32")
  currentWave = 0;

  @type("int32")
  enemiesSpawned = 0;

  @type("int32")
  enemiesKilled = 0;

  addShip(ship: Ship): void {
    this.ships[ship.uuid] = ship;
    ship.onInitGame(this);
  }

  removeShip(ship: Ship): void {
    delete this.ships[ship.uuid];
  }

  addEnemy(enemy: Enemy): void {
    this.enemies[enemy.uuid] = enemy;
    this.enemiesSpawned++;
    enemy.onInitGame(this);
  }

  removeEnemy(enemy: Enemy): void {
    delete this.enemies[enemy.uuid];

    /** Cleanup flocking **/
    if(enemy.flock !== undefined) {
      for(let i = 0, l = enemy.flock.length; i < l; i++) {
        if(enemy.flock[i].uuid == enemy.uuid) {
          enemy.flock.splice(i,1);
          break;
        }
      }
    }
  }

  addBullet(bullet: Bullet): void {
    this.bullets[bullet.uuid] = bullet;
    bullet.onInitGame(this);
  }

  addBullets(bullets: Bullet[]): void {
    for(let i = 0; i < bullets.length; i++){
      this.addBullet(bullets[i]);
    }
  }

  removeBullet(bullet: Bullet): void {
    delete this.bullets[bullet.uuid];
  }

  removeAllShips(): void {
    for(const uuid in this.ships) {
      this.removeEnemy(this.ships[uuid]);
    }
  }

  removeAllBullets(): void {
    for(const uuid in this.bullets) {
      this.removeEnemy(this.bullets[uuid]);
    }
  }

  removeAllEnemies(): void {
    for(const uuid in this.enemies) {
      this.removeEnemy(this.enemies[uuid]);
    }
  }

  battleLost(): void {
    this.removeAllShips();
    this.removeAllBullets();
    this.removeAllEnemies();
  }

  hasStarted(): boolean {
    return this.startGame <= 0;
  }

  hasEnemies(): boolean {
    return Object.keys(this.enemies).length > 0;
  }

  hasShips(): boolean {
    return Object.keys(this.ships).length > 0;
  }

  getClosestEnemy(x: number, y: number, ignoreInvisible= false): Enemy {
    let returnEnemy: Enemy = null;
    let distance = 99999;
    for(const key in this.enemies) {
      const enemy = this.enemies[key];
      if(enemy.invisible && ignoreInvisible == false) continue;
      const d: number = CollisionHelper.distance(x, y, enemy.position.x, enemy.position.y);
      if(d < distance) {
        returnEnemy = enemy;
        distance = d;
      }
    }
    return returnEnemy;
  }

  getEnemiesInRange(x: number, y: number, radius: number, ignoreInvisible = false): Enemy[] {
    const enemies: Enemy[] = [];
    for(const key in this.enemies) {
      const enemy = this.enemies[key];
      if(enemy.invisible && ignoreInvisible == false) continue;
      const d: number = CollisionHelper.distance(x, y, enemy.position.x, enemy.position.y);
      if(d <= radius){
        enemies.push(enemy);
      }
    }
    return enemies;
  }

  getShipsInRange(x: number, y: number, radius: number, ignoreInvisible = false): Ship[] {
    const ships: Ship[] = [];
    for(const key in this.ships) {
      const ship = this.ships[key];
      if(ship.invisible && ignoreInvisible == false) continue;
      const d: number = CollisionHelper.distance(x, y, ship.position.x, ship.position.y);
      if(d <= radius){
        ships.push(ship);
      }
    }
    return ships;
  }

  getClosestShip(x: number, y: number, ignoreInvisible = false): Ship {
    let returnShip: Ship = null;
    let distance = 99999;
    for(const key in this.ships) {
      const ship = this.ships[key];
      if(ship.invisible && ignoreInvisible == false) continue;
      const d: number = CollisionHelper.distance(x, y, ship.position.x, ship.position.y);
      if(d < distance) {
        returnShip = ship;
        distance = d;
      }
    }
    return returnShip;
  }

}
