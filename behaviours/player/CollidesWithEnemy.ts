import { Behaviour } from '../behaviour';
import { Enemy } from '../../models/Enemy';
import { CollisionHelper } from '../../helpers/CollisionHelper';


export class CollidesWithEnemy extends Behaviour {

  enemies:[Enemy];

  constructor(target, enemies:[Enemy]) {
    super('CollidesWithEnemy', target);
    this.enemies = enemies;

  }

  public onUpdate(deltaTime:number) {
    for(let enemy of this.enemies) {
      if(CollisionHelper.collisionBetween(this.target, enemy)) {
        this.target.takeDamage(enemy.collision_damage);
        enemy.destroy();
      }
    }
  }
}
