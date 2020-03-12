import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { Bullet, Entity } from '../../models';

export class ExplodeBehaviour extends Behaviour {

  public blastRadius: number;
  target: Bullet;

  constructor(target: Bullet) {
    super('explode', target);
  }

  onEvent(): void {
    if(this.target.blastRadius == null || this.target.blastRadius == 0) return;
    let entities: Entity[];
    if(this.target.bulletType == C.SHIP_BULLET) {
      entities = this.target.$state.getEnemiesInRange(this.target.position.x, this.target.position.y, this.target.blastRadius, true);
    } else {
      entities = this.target.$state.getShipsInRange(this.target.position.x, this.target.position.y, this.target.blastRadius, true);
    }
    for(const entity of entities) {
      entity.handleEvent('take_damage', { damage: this.target.damage, firedBy: this.target.firedBy });
    }
  }
}
