import {Schema, MapSchema, type} from '@colyseus/schema';
import { Ship } from '../../Internal';

export class ShipList extends Schema {

  @type({map: Ship})
  ships: MapSchema<Ship>;

  constructor( ships: any = {}) {
    super();
    this.ships = new MapSchema<Ship>(ships);
  }

}
