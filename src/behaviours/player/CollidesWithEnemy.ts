import { Behaviour } from '../behaviour';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { Entity } from '../../models/Entity';


export class CollidesWithEnemy extends Behaviour {

  constructor(target: Entity) {
    super('CollidesWithEnemy', target);
  }

  public onUpdate(deltaTime: number): void {
    for(const uuid in this.target.$state.enemies) {
      const enemy = this.target.$state.enemies[uuid];
      if(CollisionHelper.collisionBetween(this.target, enemy)) {
        if(this.target.collisionInvulnerable == false) {
          this.target.handleEvent('take_damage', { damage: enemy.collisionDamage});
        }

        if(enemy.collisionInvulnerable == false) {
          enemy.handleEvent('take_damage', { damage: enemy.health, firedBy: this.target });
        }
      }
    }
  }
}
