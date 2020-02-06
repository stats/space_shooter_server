import { merge } from 'lodash';
import { Entity } from '../entity';
import { Ship } from '../ship';
import { Bullet } from '../bullet';
import { PRIMARY } from '../../Primary';

export class Primary {

  damage:number;
  speed:number;
  range:number;
  radius:number;
  fire_rate:number;

  bullet_count:number;
  bullet_angle:number;
  bullet_offset:number;

  bullet_mesh:string;

  blast_radius:number;

  entity:Entity;

  constructor(entity:Entity, options:any) {
    merge(this, options);
    this.entity = entity;

    if(this.entity instanceof Ship) {
      this.damage    = (this.entity as Ship).getDamage() * this.damage;
      this.range     = (this.entity as Ship).getRange() * this.range;
      this.fire_rate = (this.entity as Ship).getFireRate() * this.fire_rate;
    }
  }

  getBullets():Bullet[] { return []; }

  spawnBullets(fired_by?:Entity):void {
    let bullets = this.getBullets();
    if(fired_by) {
      for(var i = 0, l = bullets.length; i < l; i++) {
        bullets[i].fired_by = fired_by;
      }
    }
    this.entity.$state.addBullets(bullets);
  }

  static getSystem(type:string, entity:Entity) {
    let system_type = PRIMARY.TYPE[type]["system_type"];
    return new system_type( entity, PRIMARY.TYPE[type]);
  }

}
