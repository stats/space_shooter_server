import { Entity } from '../models/Entity';
import { C, CT } from '../Constants';
import * as Intersects from 'intersects';

export class CollisionHelper {

  static collisionBetween(e1: Entity, e2: Entity): boolean {
    if(e1.collisionType == CT.CIRCLE && e2.collisionType == CT.CIRCLE)
      return Intersects.circleCircle(e1.position.x, e1.position.y, e1.radius, e2.position.x, e2.position.y, e2.radius);
    if(e1.collisionType == CT.CIRCLE && e2.collisionType == CT.ELLIPSE)
      return Intersects.circleEllipse(e1.position.x, e1.position.y, e1.radius, e2.position.x, e2.position.y, e2.radiusX, e2.radiusY);
    if(e1.collisionType == CT.CIRCLE && e2.collisionType == CT.BOX)
      return Intersects.circleBox(e1.position.x, e1.position.y, e1.radius, e2.position.x, e2.position.y, e2.width, e2.height);
    if(e1.collisionType == CT.ELLIPSE && e2.collisionType == CT.CIRCLE)
      return Intersects.ellipseCircle(e1.position.x, e1.position.y, e1.radiusX, e1.radiusY, e2.position.x, e2.position.y, e2.radius);
    if(e1.collisionType == CT.ELLIPSE && e2.collisionType == CT.ELLIPSE)
      return Intersects.ellipseEllipse(e1.position.x, e1.position.y, e1.radiusX, e1.radiusY, e2.position.x, e2.position.y, e2.radiusX, e2.radiusY);
    if(e1.collisionType == CT.ELLIPSE && e2.collisionType == CT.BOX)
      return Intersects.ellipseBox(e1.position.x, e1.position.y, e1.radiusX, e1.radiusY, e2.position.x, e2.position.y,e2.width, e2.height);
    if(e1.collisionType == CT.BOX && e2.collisionType == CT.CIRCLE)
      return Intersects.boxCircle(e1.position.x, e1.position.y, e1.width, e1.height, e2.position.x, e2.position.y, e2.radius);
    if(e1.collisionType == CT.BOX && e2.collisionType == CT.ELLIPSE)
      return Intersects.boxEllipse(e1.position.x, e1.position.y, e1.width, e1.height, e2.position.x, e2.position.y, e2.radiusX, e2.radiusY);
    if(e1.collisionType == CT.BOX && e2.collisionType == CT.BOX)
      return Intersects.boxBox(e1.position.x, e1.position.y, e1.width, e1.height, e2.position.x, e2.position.y, e2.width, e2.height);
    console.log("[CollisionHelper] Could not resolve collision.", e1, e2);
  }

  static distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx: number = x1 - x2;
    const dy: number = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
  }

  static insideBounds(e: Entity): boolean {
    if( e.position.x > C.BOUNDS.minX - (C.SPAWN_OFFSET * 2) &&
        e.position.x < C.BOUNDS.maxX + (C.SPAWN_OFFSET * 2) &&
        e.position.y > C.BOUNDS.minY - (C.SPAWN_OFFSET * 2) &&
        e.position.y < C.BOUNDS.maxY + (C.SPAWN_OFFSET * 2)) {
      return true;
    }
    return false;
  }

  static tooFar(e: Entity): boolean {
    if(e.position.x > C.BOUNDS.maxX + (C.SPAWN_OFFSET * 10) ||
       e.position.x < C.BOUNDS.minX - (C.SPAWN_OFFSET * 10) ||
       e.position.y > C.BOUNDS.maxY + (C.SPAWN_OFFSET * 10) ||
       e.position.y < C.BOUNDS.minY - (C.SPAWN_OFFSET * 10) ) {
      return true;
    }
    return false;
  }

  static outsideBounds(e: Entity): boolean {
    if( e.position.x < C.BOUNDS.minX - (C.SPAWN_OFFSET * 2) ||
        e.position.x > C.BOUNDS.maxX + (C.SPAWN_OFFSET * 2) ||
        e.position.y < C.BOUNDS.minY - (C.SPAWN_OFFSET * 2) ||
        e.position.y > C.BOUNDS.maxY + (C.SPAWN_OFFSET * 2)) {
      return true;
    }
    return false;
  }
}
