import { Behaviour } from '../behaviour';
import { Enemy } from '../../models/Enemy';
import { GameState } from '../../models/GameState';
import { CollisionHelper } from '../../helpers/CollisionHelper';


export class CollidesWithEnemy extends Behaviour {

  constructor(target) {
    super('CollidesWithEnemy', target);

  }

  public onUpdate(deltaTime:number) {
    for(let uuid in this.target.$state.enemies) {
      let enemy = this.target.$state.enemies[uuid];
      if(CollisionHelper.collisionBetween(this.target, enemy)) {
        if(this.target.collision_invulnerable == false) {
          this.target.handleEvent('take_damage', { damage: enemy.collision_damage});
        }

        if(enemy.collision_invulnerable == false) {
          enemy.handleEvent('take_damage', { damage: enemy.health, fired_by: this.target });
        }
      }
    }
  }
}
