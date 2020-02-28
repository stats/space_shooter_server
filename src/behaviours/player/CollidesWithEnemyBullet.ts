import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';
import { GameState } from '../../models/GameState';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { C } from '../../Constants';

export class CollidesWithEnemyBullet extends Behaviour {

  constructor(target) {
    super('CollidesWithEnemyBullet', target);
  }

  public onUpdate(deltaTime: number) {
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
