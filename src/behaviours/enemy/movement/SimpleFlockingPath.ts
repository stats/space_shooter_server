import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { Position } from '../../../models/Position';
import { Enemy } from '../../../models/Enemy';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class SimpleFlockingPath extends Behaviour {

  destination:Position;
  flock:Enemy[];

  entered_screen:boolean = false;

  constructor(target:any, args: {destination:Position, flock:Enemy[]}) {
    super('SimpleFlockingPath', target);
    this.flock = args.flock || [];
    this.destination = args.destination || new Position(0, 0);
    this.target.velocity = new Position(0,0);
  }

  onUpdate(deltaTime:number) {
    if(this.flock.length > 1) {
      this.flockBehaviour(deltaTime);
    } else {
      this.moveTowardsTarget(deltaTime);
    }

    if(!this.entered_screen && CollisionHelper.insideBounds(this.target)){
      this.entered_screen = true;
    }
    if(this.entered_screen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
    if(this.target.position.distanceTo(this.destination) < 50 ) {
      this.target.handleEvent('destroyed');
    }
  }

  private moveTowardsTarget(deltaTime:number) {
    this.target.velocity.x = this.destination.x - this.target.position.x;
    this.target.velocity.y = this.destination.y - this.target.position.y;
    this.target.velocity.capSpeed(this.target.speed);
    this.target.position.x += this.target.velocity.x * deltaTime / 1000;
    this.target.position.y += this.target.velocity.y * deltaTime / 1000;

  }

  private flockBehaviour(deltaTime:number) {
    let v1:Position = this.towardsCenter();
    let v2:Position = this.keepDistance();
    let v3:Position = this.matchVelocity();
    let v4:Position = this.towardsDestination();
    v4.capSpeed(1);

    this.target.velocity.x = this.target.velocity.x + v1.x + v2.x + v3.x + v4.x;
    this.target.velocity.y = this.target.velocity.y + v1.y + v2.y + v3.y + v4.y;

    /**
     * Maintain max speed
     **/
    this.target.velocity.capSpeed(this.target.speed);

    this.target.position.x += this.target.velocity.x * deltaTime / 1000;
    this.target.position.y += this.target.velocity.y * deltaTime / 1000;
  }

  private towardsCenter():Position {
    let pc = new Position(0,0);
    for(let e of this.flock) {
      if(e != this.target) {
        pc.add(e.position);
      }
    }

    pc.divN(this.flock.length - 1);
    pc.sub(this.target.position);
    pc.divN(100);

    return pc;
  }

  private keepDistance():Position {
    let c = new Position(0, 0);
    for(let e of this.flock) {
      if( e != this.target ) {
        if(e.position.distanceTo(this.target.position) < this.target.radius * 4) {
          c.x = c.x - (e.position.x - this.target.position.x);
          c.y = c.y - (e.position.y - this.target.position.y);
        }
      }
    }
    return c;
  }

  private matchVelocity():Position {
    let pv:Position = new Position(0,0);

    for(let e of this.flock) {
      if(e != this.target) {
        pv.add(e.velocity);
      }
    }

    pv.divN(this.flock.length - 1);

    pv.sub(this.target.velocity);
    pv.divN(8);

    return pv;
  }

  private towardsDestination() {
    let x:number = (this.destination.x - this.target.position.x) / 100;
    let y:number = (this.destination.y - this.target.position.y) / 100;
    return new Position(x, y);
  }
}
