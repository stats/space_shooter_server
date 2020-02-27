import { Schema, type, MapSchema } from '@colyseus/schema';

import { Ship } from './Ship';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';

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

  @type("int32")
  current_wave:number = 0;

  @type("int32")
  enemies_spawned:number = 0;

  @type("int32")
  enemies_killed:number = 0;

  addShip(ship:Ship) {
    this.ships[ship.uuid] = ship;
    ship.onInitGame(this);
  }

  removeShip(ship:Ship) {
    delete this.ships[ship.uuid];
  }

  addEnemy(enemy:Enemy) {
    this.enemies[enemy.uuid] = enemy;
    this.enemies_spawned++;
    enemy.onInitGame(this);
  }

  removeEnemy(enemy:Enemy) {
    delete this.enemies[enemy.uuid];

    /** Cleanup flocking **/
    if(enemy.flock !== undefined) {
      for(var i = 0, l = enemy.flock.length; i < l; i++) {
        if(enemy.flock[i].uuid == enemy.uuid) {
          enemy.flock.splice(i,1);
          break;
        }
      }
    }
  }

  addBullet(bullet:Bullet) {
    this.bullets[bullet.uuid] = bullet;
    bullet.onInitGame(this);
  }

  addBullets(bullets:Bullet[]) {
    for(var i = 0; i < bullets.length; i++){
      this.addBullet(bullets[i]);
    }
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

  getClosestEnemy(x:number, y:number, ignoreInvisible:boolean= false):Ship {
    let return_enemy:Ship = null;
    let distance:number = 99999;
    for(let key in this.enemies) {
      let enemy = this.enemies[key];
      if(enemy.invisible && ignoreInvisible == false) continue;
      let d:number = CollisionHelper.distance(x, y, enemy.position.x, enemy.position.y);
      if(d < distance) {
        return_enemy = enemy;
        distance = d;
      }
    }
    return return_enemy;
  }

  getEnemiesInRange(x:number, y:number, radius:number, ignoreInvisible:boolean = false) {
    let enemies:Enemy[] = [];
    for(let key in this.enemies) {
      let enemy = this.enemies[key];
      if(enemy.invisible && ignoreInvisible == false) continue;
      let d:number = CollisionHelper.distance(x, y, enemy.position.x, enemy.position.y);
      if(d <= radius){
        enemies.push(enemy);
      }
    }
    return enemies;
  }

  getShipsInRange(x:number, y:number, radius:number, ignoreInvisible:boolean = false) {
    let ships:Ship[] = [];
    for(let key in this.ships) {
      let ship = this.ships[key];
      if(ship.invisible && ignoreInvisible == false) continue;
      let d:number = CollisionHelper.distance(x, y, ship.position.x, ship.position.y);
      if(d <= radius){
        ships.push(ship);
      }
    }
    return ships;
  }

  getClosestShip(x:number, y:number, ignoreInvisible:boolean = false):Ship {
    let return_ship:Ship = null;
    let distance:number = 99999;
    for(let key in this.ships) {
      let ship = this.ships[key];
      if(ship.invisible && ignoreInvisible == false) continue;
      let d:number = CollisionHelper.distance(x, y, ship.position.x, ship.position.y);
      if(d < distance) {
        return_ship = ship;
        distance = d;
      }
    }
    return return_ship;
  }

}
