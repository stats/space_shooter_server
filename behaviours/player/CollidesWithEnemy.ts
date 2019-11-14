import { Behaviour } from '../behaviour';
import { Enemy } from '../../models/Enemy';
import { GameState } from '../../models/GameState';
import { CollisionHelper } from '../../helpers/CollisionHelper';


export class CollidesWithEnemy extends Behaviour {

  state:GameState;

  constructor(target, state) {
    super('CollidesWithEnemy', target);
    this.state = state;

  }

  public onUpdate(deltaTime:number) {
    for(let uuid in this.state.enemies) {
      let enemy = this.state.enemies[uuid];
      if(CollisionHelper.collisionBetween(this.target, enemy)) {
        this.target.takeDamage(enemy.collision_damage);
        enemy.destroy();
      }
    }
  }
}
