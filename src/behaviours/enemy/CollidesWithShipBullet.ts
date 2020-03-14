import { Behaviour, Bullet, Enemy, CollisionHelper, C } from '../../Internal';

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
