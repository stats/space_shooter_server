import { Schema, type, MapSchema } from '@colyseus/schema';

import { Ship } from './ship';
import { Enemy } from './enemy';
import { Bullet } from './bullet';

import { CollisionHelper } from '../helpers/CollisionHelper';
import { Bounds } from '../helpers/Bounds';

export class GameState extends Schema {

  @type({map:Ship})
  ships = new MapSchema<Ship>();

  @type({map:Enemy})
  enemies = new MapSchema<Enemy>();

  @type({map:Bullet})
  bullets = new MapSchema<Bullet>();

  @type("number")
  start_game:number = 5; //number of seconds until the game starts

  addShip(ship:Ship) {
    this.ships[ship.uuid] = ship;
    ship.onInitGame(this);
  }

  removeShip(ship:Ship) {
    delete this.ships[ship.uuid];
  }

  addEnemy(enemy:Enemy) {
    this.enemies[enemy.uuid] = enemy;
    enemy.onInitGame(this);
  }

  removeEnemy(enemy:Enemy) {
    delete this.enemies[enemy.uuid];
  }

  addBullet(bullet:Bullet) {
    this.bullets[bullet.uuid] = bullet;
    bullet.onInitGame(this);
  }

  removeBullet(bullet:Bullet) {
    delete this.bullets[bullet.uuid];
  }

  removeAllShips():void {
    for(let uuid in this.ships) {
      this.removeEnemy(this.ships[uuid]);
    }
  }

  removeAllBullets():void {
    for(let uuid in this.bullets) {
      this.removeEnemy(this.bullets[uuid]);
    }
  }

  removeAllEnemies():void {
    for(let uuid in this.enemies) {
      this.removeEnemy(this.enemies[uuid]);
    }
  }

  battleLost():void {
    this.removeAllShips();
    this.removeAllBullets();
    this.removeAllEnemies();
  }

  hasStarted():boolean {
    return this.start_game <= 0;
  }

  hasEnemies():boolean {
    return Object.keys(this.enemies).length > 0;
  }

  hasShips():boolean {
    return Object.keys(this.ships).length > 0;
  }

  getClosestShip(x:number, y:number):Ship {
    let return_ship:Ship = this.ships[0];
    let distance:number = CollisionHelper.distance(x, y, return_ship.x, return_ship.y);
    for(let i:number = 1, l:number = this.ships.length; i < l; i++) {
      let ship:Ship = this.ships[i];
      let d:number = CollisionHelper.distance(x, y, ship.x, ship.y)
      if(d < distance) {
        return_ship = ship;
        distance = d;
      }
    }
    return return_ship;
  }

}
