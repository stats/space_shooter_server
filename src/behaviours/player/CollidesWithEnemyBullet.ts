import { Behaviour } from '../behaviour';
import { Bullet } from '../../models/Bullet';
import { GameState } from '../../models/GameState';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { C } from '../../constants';

export class CollidesWithEnemyBullet extends Behaviour {

  state:GameState;

  constructor(target, state:GameState) {
    super('CollidesWithEnemyBullet', target);
    this.state = state;

  }

  public onUpdate(deltaTime:number) {
    for(let uuid in this.state.bullets) {
      let bullet:Bullet = this.state.bullets[uuid];
      if(bullet.bullet_type == C.ENEMY_BULLET && CollisionHelper.collisionBetween(this.target, bullet)) {
        this.target.takeDamage(bullet.damage);
        bullet.destroy();
      }
    }
  }

}
