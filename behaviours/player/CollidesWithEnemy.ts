import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';
import { CollisionHelper } from '../../helpers/CollisionHelper';

export class CollidesWithEnemy extends Behaviour {

  enemies:[Enemies];

  constructor(target, enemies:[Enemy]) {
    super('CollidesWithEnemy', target);
    this.enemies = enemies;

  }

  public onUpdate(deltaTime:number) {
    for(let enemy in this.enemies) {
      if(CollisionHelper.collisionBetween(this.target, ship)) {
        this.target.takeDamage(enemy.collision_damage);
        enemy.destroy();
      }
    }
  }
}
