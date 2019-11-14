import { Entity } from '../models/entity';

export class CollisionHelper {

  static collisionBetween(e1:Entity, e2:Entity) {
    let dx = e1.x - e2.x;
    let dy = e1.y - e2.y;
    let dr = (e1.diameter/2) + (e2.diameter/2);
    return dx*dx + dy*dy <= dr*dr;
  }

}
