import { Schema, type } from "@colyseus/schema";
import { pick, merge } from 'lodash';
import { UsernameGenerator } from '../helpers/UsernameGenerator';

export class Account extends Schema {

  createdAt:number;
  email:string;
  password:string;

  system_id:string;

  @type("string")
  username:string;

  @type({map: "boolean" })
  unlocked:MapSchema;

  constructor(options) {
    super();
    merge(this, options);
    if(!this.unlocked) this.unlocked = new MapSchema(options.unlocked);
    if(!this.createdAt) this.createdAt = Date.now();
    if(!this.username) this.username = UsernameGenerator.getUsername();
  }

  checkUnlocks() {
    
  }

  public toSaveObject(): any {
    const baseObj:any = pick(this, [
      'createdAt', 'email', 'password', 'system_id', 'username', 'unlocked'
    ]);
    return baseObj;
  }


}
