import { merge } from 'lodash';
import { Entity } from '../Entity';
import { Ship } from '../Ship';
import { Bullet } from '../Bullet';

export class Primary {

  damage: number;
  speed: number;
  range: number;
  radius: number;
  fireRate: number;

  bulletCount: number;
  bulletAngle: number;
  bulletOffset: number;

  bulletMesh: string;

  blastRadius: number;

  entity: Entity;

  behaviour: string;

  constructor(entity: Entity, options: any) {
    merge(this, options);
    this.entity = entity;

    if(this.entity instanceof Ship) {
      this.damage    = (this.entity as Ship).getDamage() * this.damage;
      this.range     = (this.entity as Ship).getRange() * this.range;
      this.fireRate = (this.entity as Ship).getFireRate() * this.fireRate;
    }
  }

  getBullets(): Bullet[] { return []; }

  spawnBullets(firedBy?: Entity): void {
    const bullets = this.getBullets();
    if(firedBy) {
      for(let i = 0, l = bullets.length; i < l; i++) {
        bullets[i].firedBy = firedBy;
      }
    }
    this.entity.$state.addBullets(bullets);
  }

}
