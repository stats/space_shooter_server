import {Schema, type} from '@colyseus/schema';

export class ErrorMessage extends Schema {

  @type("string")
  key: string;

  @type("string")
  message: string;

  constructor(message: string, key = "error") {
    super();
    this.key = key;
    this.message = message;
  }

}
