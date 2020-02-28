import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { Enemy } from '../../models/Enemy';
import { CollisionHelper } from '../../helpers/CollisionHelper';

export class ClosestEnemyPath extends Behaviour {

  targetEnemy: Enemy;
  theta: number;
  enteredScreen = false;
  distanceTraveled = 0;

  constructor(target: any) {
    super('ClosestPlayerPath', target);
    this.targetEnemy = this.target.$state.getClosestEnemy(this.target.x, this.target.y);
    if(this.targetEnemy == null){
      console.log("Error: Ship is null in TargetPlayerStartPath");
      this.target.handleEvent('destroyed');
      return;
    }
    const dx = this.target.position.x - this.targetEnemy.position.x;
    const dy = this.target.position.y - this.targetEnemy.position.y;
    this.theta = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime) {
    if(this.targetEnemy != null) {
      const dx = this.target.position.x - this.targetEnemy.position.x;
      const dy = this.target.position.y - this.targetEnemy.position.y;
      this.theta = Math.atan2(dy, dx);
    }

    this.target.position.x += -Math.cos(this.theta) * this.target.speed * deltaTime/1000;
    this.target.position.y += -Math.sin(this.theta) * this.target.speed * deltaTime/1000;

    this.distanceTraveled += this.target.speed * deltaTime/1000;

    if(this.distanceTraveled >= this.target.range){
      this.target.handleEvent('destroyed');
    }

    if(!this.enteredScreen && CollisionHelper.insideBounds(this.target)){
      this.enteredScreen = true;
    }
    if(this.enteredScreen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

}
