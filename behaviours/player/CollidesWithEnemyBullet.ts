import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';
import { CollisionHelper } from '../../helpers/CollisionHelper';

export class CollidesWithEnemyBullet extends Behaviour {

  enemyBullets:[Bullet];

  constructor(target, enemyBullets:[Bullet]) {
    super('CollidesWithEnemyBullet', target);
    this.enemyBullets = enemyBullets;

  }

  public onUpdate(deltaTime:number) {
    for(let bullet of this.enemyBullets) {
      if(CollisionHelper.collisionBetween(this.target, bullet)) {
        this.target.takeDamage(bullet.damage);
        bullet.destroy();
      }
    }
  }

}
