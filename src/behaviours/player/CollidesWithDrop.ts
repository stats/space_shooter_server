import { Behaviour, CollisionHelper, Ship } from '../../Internal';

export class CollidesWithDrop extends Behaviour {

  target: Ship;

  constructor(target: Ship) {
    super('CollidesWithDrop', target);
  }

  public onUpdate(deltaTime: number): void {
    for(const uuid in this.target.$state.drops) {
      const drop = this.target.$state.drops[uuid];
      if(CollisionHelper.collisionBetween(this.target, drop)) {
        this.target.handleEvent('collect_drop', drop);
      }
    }
  }
}
