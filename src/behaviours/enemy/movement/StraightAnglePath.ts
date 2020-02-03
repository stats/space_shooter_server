import { Behaviour } from '../../behaviour';
import { C } from '../../../constants';
import { Position } from '../../../models/position';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class StraightAnglePath extends Behaviour {

  start:Position;
  angle:number;

  entered_screen:boolean = false;

  constructor(target:any) {
    super('StraightAnglePath', target);
    this.start = new Position(this.target.position.x, this.target.position.y);


    let to_x = 0;
    let to_y = 0;
    if(this.target.position.x < C.BOUNDS.minX) {
      to_x = C.BOUNDS.maxX + C.SPAWN_OFFSET;
      to_y = C.BOUNDS.maxY - this.target.position.y;
    }
    if(this.target.position.x > C.BOUNDS.maxX) {
      to_x = -C.SPAWN_OFFSET;
      to_y = C.BOUNDS.maxY - this.target.position.y;
    }
    if(this.target.position.y < C.BOUNDS.minY) {
      to_x = C.BOUNDS.maxX - this.target.position.x;
      to_y = C.BOUNDS.maxY + C.SPAWN_OFFSET;
    }
    if(this.target.position.y > C.BOUNDS.maxY){
        to_x = C.BOUNDS.maxX - this.target.position.x;
        to_y = -C.SPAWN_OFFSET;
    }

    let dx = to_x - this.target.position.x;
    let dy = to_y - this.target.position.y;

    this.angle = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime) {
    this.target.position.x += Math.cos(this.angle) * this.target.speed * deltaTime/1000;
    this.target.position.y += Math.sin(this.angle) * this.target.speed * deltaTime/1000;

    if(!this.entered_screen && CollisionHelper.insideBounds(this.target)){
      this.entered_screen = true;
    }
    if(this.entered_screen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }
}
