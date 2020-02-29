import {Schema, MapSchema, type} from '@colyseus/schema';
import { UnlockItem } from './UnlockItem';

export class UnlockMessage extends Schema {

  @type({map: UnlockItem})
  unlocks: MapSchema<UnlockItem>;

  constructor( unlocks: any = {}) {
    super();
    this.unlocks = new MapSchema<UnlockItem>(unlocks);
  }

}
