import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class ExplodeBehaviour extends Behaviour {

  constructor(target:any, ) {
    super('explode', target);
  }

  onEvent() {
    if(this.target.blast_radius == null || this.target.blast_radius == 0) return;
    let enemies = this.target.$state.getEnemyInRange(this.target.x, this.target.y, this.target.blast_radius);
    for(let enemy of enemies) {
      enemy.handleEvent('take_damage', { damage: this.target.damage, fired_by: this.target.fired_by });
    }
  }
}
