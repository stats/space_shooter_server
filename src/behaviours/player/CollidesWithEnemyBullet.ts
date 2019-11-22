import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';
import { GameState } from '../../models/GameState';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { C } from '../../constants';

export class CollidesWithEnemyBullet extends Behaviour {

  constructor(target) {
    super('CollidesWithEnemyBullet', target);
  }

  public onUpdate(deltaTime:number) {
    for(let uuid in this.target.$state.bullets) {
      let bullet:Bullet = this.target.$state.bullets[uuid];
      if(bullet.bullet_type == C.ENEMY_BULLET && CollisionHelper.collisionBetween(this.target, bullet)) {
        this.target.handleEvent('take_damage', bullet.damage);
        this.target.handleEvent('destroyed');
      }
    }
  }

}
