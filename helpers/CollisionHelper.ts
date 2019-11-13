import RBush from 'rbush';
import { C, L } from '../constants';

export class CollisionHelper {

  bushes:[RBush];
  bushReference:any;

  constructor() {
    this.bushReference = {};
    this.bushes = [];
    this.bushes[L.SHIP] = new RBush();
    this.bushes[L.ENEMIES] = new RBush();
    this.bushes[L.SHIP_BULLETS] = new RBush();
    this.bushes[L.ENEMY_BULLETS] = new RBush();
  }

  insert(bush_type:number, entity:Entity) {
    const item;
    if(entity.collision_type == C.CIRLCE) {
      item = {
        minX: entity.x - (entity.diameter/2),
        maxX: entity.x + (entity.diameter/2),
        minY: entity.y + (entity.diameter/2),
        maxY: entity.y + (entity.diameter/2),
        uuid: entity.uuid
      }
    } else {
      item = {
        minX: entity.x - (entity.width/2),
        maxX: entity.x + (entity.width/2),
        minY: entity.y + (entity.height/2),
        maxY: entity.y + (entity.height/2),
        uuid: entity.uuid
      }
    }
    this.bushReference[entity.uuid] = item;
    this.bushes[bush_type].insert(item);
  }

  remove(bush_type:number, entity:Entity) {
    const item = this.bushReference[entity.uuid];
    if(!item) return;
    this.bushes[bush_type].remove(item);
    delete this.bushReferences[entity.uuid];
  }

  search(bush_type:number, bounds:Bounds) {
    return this.bushes[bush_type].search({
      minX: bounds.minX,
      maxX: bounds.maxX,
      minY: bounds.minY,
      maxY: bounds.maxY
    });
  }
}
