import { Behaviour } from '../../behaviour';
import { C } from '../../../constants';
import { Ship } from '../../../models/ship';
import { CollisionHelper } from '../../../helpers/CollisionHelper';

export class ClosestPlayerAtStartPath extends Behaviour {

  target_player:Ship;
  theta:number;
  entered_screen:boolean = false;

  constructor(target:any) {
    super('ClosestPlayerAtStartPath', target);
    this.target_player = this.target.$state.getClosestShip(this.target.x, this.target.y);
    if(this.target_player == null){
      console.log("Error: Ship is null in TargetPlayerStartPath");
      this.target.handleEvent('destroyed');
      return;
    }
    let dx = this.target.position.x - this.target_player.position.x;
    let dy = this.target.position.y - this.target_player.position.y;
    this.theta = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime) {
    if(this.target_player != null) {
      let dx = this.target.position.x - this.target_player.position.x;
      let dy = this.target.position.y - this.target_player.position.y;
      this.theta = Math.atan2(dy, dx);
    }

    this.target.position.x += -Math.cos(this.theta) * this.target.speed * deltaTime/1000;
    this.target.position.y += -Math.sin(this.theta) * this.target.speed * deltaTime/1000;

    if(!this.entered_screen && CollisionHelper.insideBounds(this.target)){
      this.entered_screen = true;
    }
    if(this.entered_screen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

}