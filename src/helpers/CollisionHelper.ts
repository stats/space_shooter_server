import { Entity } from '../models/entity';
import { C, CT } from '../constants';
import * as Intersects from 'intersects';

export class CollisionHelper {

  static collisionBetween(e1:Entity, e2:Entity) {
    if(e1.collision_type == CT.CIRCLE && e2.collision_type == CT.CIRCLE) return Intersects.circleCircle(e1.x, e1.y, e1.radius, e2.x, e2.y, e2.radius);
    if(e1.collision_type == CT.CIRCLE && e2.collision_type == CT.ELLIPSE) return Intersects.circleEllipse(e1.x, e1.y, e1.radius, e2.x, e2.y, e2.radiusX, e2.radiusY);
    if(e1.collision_type == CT.CIRCLE && e2.collision_type == CT.BOX) return Intersects.circleBox(e1.x, e1.y, e1.radius, e2.x, e2.y, e2.width, e2.height);
    if(e1.collision_type == CT.ELLIPSE && e2.collision_type == CT.CIRCLE) return Intersects.ellipseCircle(e1.x, e1.y, e1.radiusX, e1.radiusY, e2.x, e2.y, e2.radius);
    if(e1.collision_type == CT.ELLIPSE && e2.collision_type == CT.ELLIPSE) return Intersects.ellipseEllipse(e1.x, e1.y, e1.radiusX, e1.radiusY, e2.x, e2.y, e2.radiusX, e2.radiusY);
    if(e1.collision_type == CT.ELLIPSE && e2.collision_type == CT.BOX) return Intersects.ellipseBox(e1.x, e1.y, e1.radiusX, e1.radiusY, e2.x, e2.y,e2.width, e2.height);
    if(e1.collision_type == CT.BOX && e2.collision_type == CT.CIRCLE) return Intersects.boxCircle(e1.x, e1.y, e1.width, e1.height, e2.x, e2.y, e2.radius);
    if(e1.collision_type == CT.BOX && e2.collision_type == CT.ELLIPSE) return Intersects.boxEllipse(e1.x, e1.y, e1.width, e1.height, e2.x, e2.y, e2.radiusX, e2.radiusY);
    if(e1.collision_type == CT.BOX && e2.collision_type == CT.BOX) return Intersects.boxBox(e1.x, e1.y, e1.width, e1.height, e2.x, e2.y, e2.width, e2.height);
    console.log("[CollisionHelper] Could not resolve collision.", e1, e2);
  }

  static distance(x1:number, y1:number, x2:number, y2:number) {
    let dx:number = x1 - x2;
    let dy:number = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
  }

  static outsideBounds(e:Entity):boolean {
    if( e.x < C.BOUNDS.minX - (C.SPAWN_OFFSET * 2) ||
        e.x > C.BOUNDS.maxX + (C.SPAWN_OFFSET * 2) ||
        e.y < C.BOUNDS.minY - (C.SPAWN_OFFSET * 2) ||
        e.y > C.BOUNDS.maxY + (C.SPAWN_OFFSET * 2)) {
      return true;
    }
    return false;
  }
}
