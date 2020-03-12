import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { Bullet, Entity } from '../../models';

export class MissilePath extends Behaviour {

  private entity: Entity;

  private xLoc = -999;
  private yLoc = -999;

  private acc_x = 0;
  private acc_y = 0;

  private speed_x = 0;
  private speed_y = 0;

  private traveled = 0;

  private gotGameState = false;

  private t1 = 0.01;
  private t2 = 0.001;

  target: Bullet;

  constructor(target: Bullet, args: { angle: number }) {
    super('MissilePath', target);
    this.target.angle = args.angle || Math.PI/2;
  }

  handleGameState(): void {
    if(this.target.bulletType == C.SHIP_BULLET) {
      this.entity = this.target.$state.getClosestEnemy(this.target.position.x, this.target.position.y);
    } else {
      this.entity = this.target.$state.getClosestShip(this.target.position.x, this.target.position.y);
    }
    if(this.entity == null) {
      this.xLoc = this.target.position.x;
      this.yLoc = this.target.position.y + this.target.range;
    }
    this.gotGameState = true;
  }

  onUpdate(deltaTime): void {
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
      this.xLoc = this.entity.position.x;
      this.yLoc = this.entity.position.y;
      this.entity = null;
    }

    const dx = this.getEntityX() - this.target.position.x;
    const dy = this.getEntityY() - this.target.position.y;
    const ct = Math.atan2(dy, dx);
    if(ct - this.target.angle > this.t1) {
      this.target.angle += this.t1;
    } else if(ct - this.target.angle < this.t1) {
      this.target.angle -= this.t1;
    } else {
      this.target.angle = ct;
    }

    this.t1 += this.t2;

    this.target.position.x += Math.cos(this.target.angle) * this.target.speed * deltaTime / 1000;
    this.target.position.y += Math.sin(this.target.angle) * this.target.speed * deltaTime / 1000;

    this.traveled += this.target.speed * deltaTime / 1000;

    if(this.traveled > this.target.range) this.target.handleEvent('destroyed');
  }

  engine(): number {
    return 5 * Math.random() * 0.1 + 0.05;
  }

  drag(): number {
    return 5 * Math.random() * 0.05 + 0.94;
  }

  sgn(n: number): number {
    return n < 0 ? -1 : 1;
  }

  getEntityX(): number {
    if( this.entity == null && this.xLoc == -999) return null;
    if( this.entity != null ) this.xLoc = this.entity.position.x;
    return this.xLoc;
  }

  getEntityY(): number {
    if( this.entity == null && this.yLoc == -999) return null;
    if( this.entity != null ) this.yLoc = this.entity.position.y;
    return this.yLoc;
  }
}
