import { Behaviour } from '../behaviour';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { Ship } from '../../models/Ship';

export class CollidesWithDrop extends Behaviour {

  target: Ship;

  dropsCollected: string[] = [];

  constructor(target: Ship) {
    super('CollidesWithDrop', target);
  }

  public onUpdate(deltaTime: number): void {
    for(const uuid in this.target.$state.drops) {
      if(this.dropsCollected.includes(uuid)) return;
      
      const drop = this.target.$state.drops[uuid];
      if(CollisionHelper.collisionBetween(this.target, drop)) {
        this.dropsCollected.push(drop.uuid);
        this.target.handleEvent('CollectDrop', drop);
      }
    }
  }
}
