import { Schema } from 'colyseus';

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
  ship_bullets = new MapSchema<Bullet>();

  @type({map:Bullet})
  enemy_bullets = new MapSchema<Bullet>();

  @type("number")
  start_game:number = 10; //number of seconds until the game starts

  addShip(ship:Ship) {
    this.ships[ship.uuid] = ship;
  }

  removeShip(ship:Ship) {
    delete this.ships[ship.uuid];
  }

  addEnemy(enemy:Enemy) {
    this.enemies[enemy.uuid] = enemy;
  }

  removeEnemy(enemy:Enemy) {
    delete this.enemies[enemy.uuid];
  }

  addShipBullet(ship_bullet:Bullet) {
    this.ship_bullets[ship_bullet.uuid] = ship_bullet;
  }

  removeShipBullet(ship_bullet:Bullet) {
    delete this.ship_bullets[ship_bullet.uuid];
  }

  addEnemyBullet(enemy_bullet:Bullet) {
    this.enemy_bullets[enemy_bullet.uuid] = enemy_bullet;
  }

  removeEnemyBullet(enemy_bullet:Bullet) {
    delete this.enemy_bullets[enemy_bullet.uuid];
  }

}
