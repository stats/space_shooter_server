import {Schema, MapSchema, type} from '@colyseus/schema';

export class UnlockItem extends Schema {

  @type("boolean")
  unlocked:boolean;

  @type("string")
  key:string;

  @type("number")
  count:number;

  constructor(key:string, unlocked:boolean, count:number) {
    super();
    this.key = key;
    this.unlocked = unlocked;
    this.count = count;
  }

}
