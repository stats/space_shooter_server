import {Schema, type} from '@colyseus/schema';

export class ErrorMessage extends Schema {

  @type("string")
  key: string;

  @type("string")
  message: string;

  constructor(key: string, message: string) {
    super();
    this.key = key;
    this.message = message;
  }

}
