import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Position } from '../../models/position';
import { Entity } from '../../models/entity';
import { GameState } from '../../models/GameState';

export class MissilePath extends Behaviour {

  private entity:Entity;

  private x_loc:number = -999;
  private y_loc:number = -999;

  private acc_x:number = 0;
  private acc_y:number = 0;

  private speed_x:number = 0;
  private speed_y:number = 0;

  private traveled:number = 0;

  private gotGameState:boolean = false;

  private theta:number = 0;
  private t1:number = 0.01;
  private t2:number = 0.001;


  constructor(target:any, args:{ angle:number }) {
    super('MissilePath', target);
    this.theta = args.angle || Math.PI/2;
  }

  handleGameState() {
    if(this.target.bullet_type == C.SHIP_BULLET) {
      this.entity = this.target.$state.getClosestEnemy(this.target.position.x, this.target.position.y);
    } else {
      this.entity = this.target.$state.getClosestShip(this.target.position.x, this.target.position.y);
    }
    if(this.entity == null) {
      this.x_loc = this.target.position.x;
      this.y_loc = this.target.position.y + this.target.range;
    }
    this.gotGameState = true;
  }

  onUpdate(deltaTime) {
    if(this.gotGameState == false && this.target.$state == null) {
      return;
    } else if (this.gotGameState == false && this.target.$state != null) {
      this.handleGameState();
    }
    if(this.getEntityX() == null) {
      this.target.handleEvent('destroyed');
      return;
    }
    if(this.entity && this.entity.invisible) {
      this.x_loc = this.entity.position.x;
      this.y_loc = this.entity.position.y;
      this.entity = null;
    }

    let dx = this.getEntityX() - this.target.position.x;
    let dy = this.getEntityY() - this.target.position.y;
    let ct = Math.atan2(dy, dx);
    if(ct - this.theta > this.t1) {
      this.theta += this.t1;
    } else if(ct - this.theta < this.t1) {
      this.theta -= this.t1;
    } else {
      this.theta = ct;
    }

    this.t1 += this.t2;

    this.target.position.x += Math.cos(this.theta) * this.target.speed * deltaTime / 1000;
    this.target.position.y += Math.sin(this.theta) * this.target.speed * deltaTime / 1000;

    this.traveled += this.target.speed * deltaTime / 1000;

    if(this.traveled > this.target.range) this.target.handleEvent('destroyed');
  }

  engine() {
    return 5 * Math.random() * 0.1 + 0.05;
  }

  drag() {
    return 5 * Math.random() * 0.05 + 0.94;
  }

  sgn(n:Number) {
    return n < 0 ? -1 : 1;
  }

  getEntityX() {
    if( this.entity == null && this.x_loc == -999) return null;
    if( this.entity != null ) this.x_loc = this.entity.position.x;
    return this.x_loc;
  }

  getEntityY() {
    if( this.entity == null && this.y_loc == -999) return null;
    if( this.entity != null ) this.y_loc = this.entity.position.y;
    return this.y_loc;
  }
}
