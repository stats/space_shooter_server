import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Entity } from '../../models/entity';

export class ExplodeBehaviour extends Behaviour {

  public blast_radius:number;

  constructor(target:any, args: {blast_radius:number}) {
    super('explode', target);
    this.blast_radius = args.blast_radius;
  }

  onEvent() {
    if(this.blast_radius == null || this.blast_radius == 0) return;
    let entities:Entity[];
    if(this.target.bullet_type == C.SHIP_BULLET) {
      entities = this.target.$state.getEnemiesInRange(this.target.position.x, this.target.position.y, this.blast_radius, true);
    } else {
      entities = this.target.$state.getShipsInRange(this.target.position.x, this.target.position.y, this.blast_radius, true);
    }
    for(let entity of entities) {
      entity.handleEvent('take_damage', { damage: this.target.damage, fired_by: this.target.fired_by });
    }
  }
}
