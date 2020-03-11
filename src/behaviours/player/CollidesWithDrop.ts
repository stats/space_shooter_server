import { Behaviour } from '../behaviour';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { Ship } from '../../models/Ship';

export class CollidesWithDrop extends Behaviour {

  target: Ship;

  constructor(target: Ship) {
    super('CollidesWithDrop', target);
  }

  public onUpdate(deltaTime: number): void {
    for(const uuid in this.target.$state.drops) {
      const enemy = this.target.$state.drops[uuid];
      if(CollisionHelper.collisionBetween(this.target, drop)) {
        this.target.handleEvent('collect_drop', drop);
      }
    }
  }
}
