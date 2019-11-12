import { Schema, type } from "@colyseus/schema";

export class Ship extends Schema {

  sessionId?:number;
  connected:bool = false;

  @type("string")
  name:string;

  @type("string")
  uuid:string;

  username:string;

  @type("number")
  x:number;

  @type("number")
  y:number;

  @type("number")
  body_type:string;

  @type("number")
  wing_type:string;

  @type("number")
  engine_type:string;

  @type("number")
  weapons_type:string;

  $room:any;

  createdAt:number;

  toSaveObject():any {
    onst baseObj:any = pick(this, [
      'username', 'name', 'uuid', 'body_type', 'wing_type', 'engine_type', 'weapon_type'
    ]);
    return baseObj;
  }
}
