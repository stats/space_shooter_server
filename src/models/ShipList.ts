import {Schema, MapSchema, type} from '@colyseus/schema';
import { Ship } from './Ship';

export class ShipList extends Schema {

  @type({map: Ship})
  ships: MapSchema;

  constructor(ships: any = {}) {
    super();
    this.ships = new MapSchema(ships);
  }

}
