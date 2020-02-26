import {Schema, MapSchema, type} from '@colyseus/schema';

export class Statistics extends Schema {

  @type({map: "number"})
  stats:MapSchema;

  constructor(stats:any = {}) {
    super();
    this.stats = new MapSchema(stats);
  }

}
