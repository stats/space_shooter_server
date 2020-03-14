import { Behaviour, CollisionHelper, C, Bullet, Ship } from '../../Internal';

export class CollidesWithEnemyBullet extends Behaviour {

  target: Ship;

  constructor(target: Ship) {
    super('CollidesWithEnemyBullet', target);
  }

  public onUpdate(deltaTime: number): void {
    if(this.target.justDamaged) return;

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
