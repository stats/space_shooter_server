import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { C } from '../../Constants';
import { Entity } from '../../models/Entity';
import { Enemy } from '../../models/Enemy';

export class CollidesWithShipBullet extends Behaviour {

  target: Enemy;

  constructor(target: Enemy) {
    super('CollidesWitShipBullet', target);
  }

  public onUpdate(deltaTime: number): void {
    for(const uuid in this.target.$state.bullets) {
      const bullet: Bullet = this.target.$state.bullets[uuid];
      if(bullet.bulletType == C.SHIP_BULLET && CollisionHelper.collisionBetween(this.target, bullet)) {
        if(this.target.bulletInvulnerable == false) {
          this.target.handleEvent('take_damage', { damage: bullet.damage, firedBy: bullet.firedBy });
        }
        if(bullet.explodes) {
          bullet.handleEvent('explode');
        }
        bullet.handleEvent('destroyed');
      }
    }
  }
}
