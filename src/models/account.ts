import { Schema, type } from "@colyseus/schema";
import { pick, merge } from 'lodash';

export class Account extends Schema {

  createdAt:number;
  email:string;
  password:string;

  @type("string")
  username:string;

  constructor(options) {
    super();
    merge(this, options);
    if(!this.createdAt) this.createdAt = Date.now();
  }

  public toSaveObject(): any {
    const baseObj:any = pick(this, [
      'createdAt', 'email', 'password', 'uuid', 'username'
    ]);
    return baseObj;
  }


}
