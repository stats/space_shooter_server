import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Position } from '../../models/position';
import { Entity } from '../../models/entity';

export class MissilePath extends Behaviour {

  private entity:Entity;

  private x_loc:number = -999;
  private y_loc:number = -999;

  private acc_x:number = 0;
  private acc_y:number = 0;

  private speed_x:number = 0;
  private speed_y:number = 0;

  private traveled:number = 0;


  constructor(target:any) {
    super('MissilePath', target);
    if(this.target.bullet_type == C.SHIP_BULLET) {
      this.entity = this.target.$state.getClosestEnemy(this.target.position.x, this.target.position.y);
    } else {
      this.entity = this.target.$state.getClosestShip(this.target.position.x, this.target.position.y);
    }
    if(this.entity == null) {
      this.x_loc = this.target.position.x;
      this.y_loc = this.target.position.y + this.target.range;
    }
  }

  onUpdate(deltaTime) {
    if(this.getEntityX() == null) {
      this.target.handleEvent('destroyed');
      return;
    }
    if(this.entity.invisible) {
      this.x_loc = this.entity.position.x;
      this.y_loc = this.entity.position.y;
      this.entity = null;
    }
    this.acc_x = this.sgn(this.getEntityX() - this.target.position.x) * this.engine() * deltaTime / 1000;
    this.acc_y = this.sgn(this.getEntityY() - this.target.position.y) * this.engine() * deltaTime / 1000;

    this.speed_x = Math.min(this.target.speed, Math.abs(this.speed_x + this.acc_x)) * this.sgn(this.speed_x + this.acc_x) * this.drag();
    this.speed_y = Math.min(this.target.speed, Math.abs(this.speed_y + this.acc_y)) * this.sgn(this.speed_y + this.acc_y) * this.drag();

    this.target.position.x += this.speed_x;
    this.target.position.y += this.speed_y;

    this.traveled += Math.abs(this.speed_x) + Math.abs(this.speed_y);

    if(this.traveled > this.target.range) this.target.handleEvent('destroyed');
  }

  engine() {
    return Math.random() * 0.1 + 0.05;
  }

  drag() {
    return Math.random() * 0.05 + 0.94;
  }

  sgn(n:Number) {
    return n < 0 ? -1 : 1;
  }

  getEntityX() {
    if( this.entity == null && this.x_loc == -999) return null;
    if( this.entity == null ) return this.x_loc;
    return this.entity.position.x;
  }

  getEntityY() {
    if( this.entity == null && this.y_loc == -999) return null;
    if( this.entity == null ) return this.y_loc;
    return this.entity.position.y;
  }
}
