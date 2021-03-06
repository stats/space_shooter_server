import {Schema, type} from '@colyseus/schema';

export class UnlockItem extends Schema {

  @type("boolean")
  unlocked: boolean;

  @type("string")
  key: string;

  @type("number")
  count: number;

  @type("string")
  unlockType: string;

  @type("string")
  name: string;

  @type("string")
  description: string;

  constructor(key: string, unlocked: boolean, count: number, unlockType: string, name: string, description: string) {
    super();
    this.key = key;
    this.unlocked = unlocked;
    this.count = count;
    this.unlockType = unlockType;
    this.name = name;
    this.description = description;
  }

}
