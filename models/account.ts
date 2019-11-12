import { Schema, type } from "@colyseus/schema";
import { pick } from 'lodash';

export class Account extends Schema {

  createdAt:number;
  email:string;
  password:string;

  @type("string")
  username:string;

  public toSaveObject(): any {
    const baseObj:any = pick(this, [
      'createdAt', 'email', 'password', 'uuid', 'username'
    ]);
    return baseObj;
  }


}
