import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';
import { CollisionHelper } from '../../helpers/CollisionHelper';

export class CollidesWithShipBullet extends Behaviour {

  shipBullets:[Bullet];

  constructor(target, shipBullets:[Bullet]) {
    super('CollidesWitShipBullet', target);
    this.enemyBullets = enemyBullets;

  }

  public onUpdate(deltaTime:number) {
    for(let bullet of this.shipBullets) {
      if(CollisionHelper.collisionBetween(this.target, bullet)) {
        this.target.takeDamage(bullet.damage);
        bullet.destroy();
      }
    }
  }
}
