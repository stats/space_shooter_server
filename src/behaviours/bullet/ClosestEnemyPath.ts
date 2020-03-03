import { Behaviour } from '../behaviour';
import { Enemy } from '../../models/Enemy';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { Bullet} from '../../models/Bullet';

export class ClosestEnemyPath extends Behaviour {

  targetEnemy: Enemy;
  enteredScreen = false;
  distanceTraveled = 0;

  target: Bullet;

  constructor(target: Bullet): void {
    super('ClosestPlayerPath', target);
    this.targetEnemy = this.target.$state.getClosestEnemy(this.target.x, this.target.y);
    if(this.targetEnemy == null){
      console.log("Error: Ship is null in TargetPlayerStartPath");
      this.target.handleEvent('destroyed');
      return;
    }
    const dx = this.target.position.x - this.targetEnemy.position.x;
    const dy = this.target.position.y - this.targetEnemy.position.y;
    this.target.angle = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime): void {
    if(this.targetEnemy != null) {
      const dx = this.target.position.x - this.targetEnemy.position.x;
      const dy = this.target.position.y - this.targetEnemy.position.y;
      this.target.angle = Math.atan2(dy, dx);
    }

    this.target.position.x += -Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
    this.target.position.y += -Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;

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
