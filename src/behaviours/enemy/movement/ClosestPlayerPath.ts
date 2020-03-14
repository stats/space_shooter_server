import { Behaviour, C, Ship, Enemy, CollisionHelper } from '../../../Internal';

export class ClosestPlayerPath extends Behaviour {

  targetPlayer: Ship;
  enteredScreen = false;

  target: Enemy;

  constructor(target: Enemy) {
    super('ClosestPlayerPath', target);
    this.targetPlayer = this.target.$state.getClosestShip(this.target.position.x, this.target.position.y);
    let dx: number, dy: number;
    if(this.targetPlayer == null){
      dx = ( C.BOUNDS.maxX / 2 ) - this.target.position.x;
      dy = ( C.BOUNDS.maxY / 2 ) - this.target.position.y;
    }
    else {
      dx = this.targetPlayer.position.x - this.target.position.x;
      dy = this.targetPlayer.position.y - this.target.position.y;
    }
    this.target.angle = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime): void {
    this.targetPlayer = this.target.$state.getClosestShip(this.target.position.x, this.target.position.y);
    if(this.targetPlayer != null) {
      const dx = this.targetPlayer.position.x - this.target.position.x;
      const dy = this.targetPlayer.position.y - this.target.position.y;
      this.target.angle = Math.atan2(dy, dx);
    }

    this.target.position.x += Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
    this.target.position.y += Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;

    if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
      this.enteredScreen = true;
    }
    if(this.enteredScreen && CollisionHelper.outsideBounds(this.target) || CollisionHelper.tooFar(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

}
