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
  bullets = new MapSchema<Bullet>();

  @type("number")
  start_game:number = 10; //number of seconds until the game starts

  addShip(ship:Ship) {
    this.ships[ship.uuid] = ship;
    ship.initGame();
  }

  removeShip(ship:Ship) {
    delete this.ships[ship.uuid];
  }

  addEnemy(enemy:Enemy) {
    this.enemies[enemy.uuid] = enemy;
    enemy.initGame();
  }

  removeEnemy(enemy:Enemy) {
    delete this.enemies[enemy.uuid];
  }

  addBullet(bullet:Bullet) {
    this.bullets[bullet.uuid] = bullet;
    bullet.initGame();
  }

  removeBullet(bullet:Bullet) {
    delete this.bullets[bullet.uuid];
  }


}
