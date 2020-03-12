import { Behaviour } from '../behaviour';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { Drop, Ship } from '../../models';

export class CollectDrop extends Behaviour {

  target: Ship;

  constructor(target: Ship) {
    super('CollectDrop', target);
  }

  public onEvent(drop: Drop): void {
    console.log('[CollectDrop] Collected a drop');
  }
}
