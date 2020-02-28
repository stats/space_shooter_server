import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { C } from '../../Constants';
import { Entity } from '../../models/Entity';

export class CollidesWithEnemyBullet extends Behaviour {

  constructor(target: Entity) {
    super('CollidesWithEnemyBullet', target);
  }

  public onUpdate(deltaTime: number): void {
    for(const uuid in this.target.$state.bullets) {
      const bullet: Bullet = this.target.$state.bullets[uuid];
      if(bullet.bulletType == C.ENEMY_BULLET && CollisionHelper.collisionBetween(this.target, bullet)) {
        if(this.target.bulletInvulnerable == false) {
          this.target.handleEvent('take_damage', {damage: bullet.damage});
        }
        bullet.handleEvent('destroyed');
      }
    }
  }

}
