import { Behaviour } from '../../behaviour';
import { C } from '../../../Constants';
import { Position } from '../../../models/Position';
import { CollisionHelper } from '../../../helpers/CollisionHelper';
import { Enemy } from '../../../models/Enemy';

export class StraightAnglePath extends Behaviour {

  start: Position;
  angle: number;

  enteredScreen = false;

  target: Enemy;

  constructor(target: Enemy) {
    super('StraightAnglePath', target);
    this.start = new Position(this.target.position.x, this.target.position.y);


    let toX = 0;
    let toY = 0;
    if(this.target.position.x < C.BOUNDS.minX) {
      toX = C.BOUNDS.maxX + C.SPAWN_OFFSET;
      toY = C.BOUNDS.maxY - this.target.position.y;
    }
    if(this.target.position.x > C.BOUNDS.maxX) {
      toX = -C.SPAWN_OFFSET;
      toY = C.BOUNDS.maxY - this.target.position.y;
    }
    if(this.target.position.y < C.BOUNDS.minY) {
      toX = C.BOUNDS.maxX - this.target.position.x;
      toY = C.BOUNDS.maxY + C.SPAWN_OFFSET;
    }
    if(this.target.position.y > C.BOUNDS.maxY){
        toX = C.BOUNDS.maxX - this.target.position.x;
        toY = -C.SPAWN_OFFSET;
    }

    const dx = toX - this.target.position.x;
    const dy = toY - this.target.position.y;

    this.angle = Math.atan2(dy, dx);
    this.target.angle = this.angle;
  }

  onUpdate(deltaTime): void {
    this.target.position.x += Math.cos(this.angle) * this.target.speed * deltaTime/1000;
    this.target.position.y += Math.sin(this.angle) * this.target.speed * deltaTime/1000;

    if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
      this.enteredScreen = true;
    }
    if(this.enteredScreen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }
}
