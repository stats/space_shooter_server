import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Enemy } from '../../models/enemy';
import { CollisionHelper } from '../../helpers/CollisionHelper';

export class ClosestEnemyPath extends Behaviour {

  target_enemy:Enemy;
  theta:number;
  entered_screen:boolean = false;
  distance_traveled:number = 0;

  constructor(target:any) {
    super('ClosestPlayerPath', target);
    this.target_enemy = this.target.$state.getClosestEnemy(this.target.x, this.target.y);
    if(this.target_enemy == null){
      console.log("Error: Ship is null in TargetPlayerStartPath");
      this.target.handleEvent('destroyed');
      return;
    }
    let dx = this.target.position.x - this.target_enemy.position.x;
    let dy = this.target.position.y - this.target_enemy.position.y;
    this.theta = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime) {
    if(this.target_enemy != null) {
      let dx = this.target.position.x - this.target_enemy.position.x;
      let dy = this.target.position.y - this.target_enemy.position.y;
      this.theta = Math.atan2(dy, dx);
    }

    this.target.position.x += -Math.cos(this.theta) * this.target.speed * deltaTime/1000;
    this.target.position.y += -Math.sin(this.theta) * this.target.speed * deltaTime/1000;

    this.distance_traveled += this.target.speed * deltaTime/1000;

    if(this.distance_traveled >= this.target.range){
      this.target.handleEvent('destroyed');
    }

    if(!this.entered_screen && CollisionHelper.insideBounds(this.target)){
      this.entered_screen = true;
    }
    if(this.entered_screen && CollisionHelper.outsideBounds(this.target)) {
      this.target.handleEvent('destroyed');
    }
  }

}
