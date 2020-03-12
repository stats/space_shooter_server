import {Schema, type} from '@colyseus/schema';

export class TempUpgrade extends Schema {

  type('string');
  name: string;

  type('string')
  description: string;

  type('string')
  key: string;

  type('number')
  value: number;

  constructor(options: { name: string, description: string, key: string, value: number}) {
    super();
    this.name = options.name;
    this.description = options.description;
    this.key = options.key;
    this.value = options.value;
  }

}
