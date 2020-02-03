import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Position } from '../../models/position';

export class MissilePath extends Behaviour {

  private x_loc:number = -999;
  private y_loc:number = -999;

  private acc_x:number = 0;
  private acc_y:number = 0;

  private speed_x:number = 0;
  private speed_y:number = 0;

  private traveled:number = 0;


  constructor(target:any) {
    super('MissilePath', target);
    this.enemy = this.target.$state.getClosestEnemy(this.target.position.x, this.target.position.y);
    if(this.enemy == null) {
      this.x_loc = this.target.position.x;
      this.y_loc = this.target.position.y + this.target.range;
    }
  }

  onUpdate(deltaTime) {
    if(this.getX() == null) {
      this.target.handleEvent('destroyed');
      return;
    }
    this.acc_x = this.sgn(this.getEnemyX() - this.target.position.x) * this.engine() * deltaTime / 1000;
    this.acc_y = this.sgn(this.getEnemyY() - this.target.position.y) * this.engine() * deltaTime / 1000;

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

  getEnemyX() {
    if( this.enemy == null && this.x_loc == -999) return null;
    if( this.enemy == null ) return x_loc;
    return this.enemy.position.x;
  }

  getEnemyY() {
    if( this.enemy == null && this.y_loc == -999) return null;
    if( this.enemy == null ) return y_loc;
    return this.enemy.position.y;
  }
}
