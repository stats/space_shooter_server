import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class ExplodeBehaviour extends Behaviour {

  public blast_radius:number;

  constructor(target:any, args: {blast_radius:number}) {
    super('explode', target);
    this.blast_radius = args.blast_radius;
  }

  onEvent() {
    if(this.blast_radius == null || this.blast_radius == 0) return;
    let enemies = this.target.$state.getEnemyInRange(this.target.x, this.target.y, this.blast_radius);
    for(let enemy of enemies) {
      enemy.handleEvent('take_damage', { damage: this.target.damage, fired_by: this.target.fired_by });
    }
  }
}
