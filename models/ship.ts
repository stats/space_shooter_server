import { Schema, type } from "@colyseus/schema";
import { KeyboardMovementBehaviour } from '../behaviours/player/KeyboardMovementBehaviour'

export class Ship extends Entity {

  sessionId?:number;
  connected:bool = false;

  @type("string")
  name:string;

  username:string;

  @type("number")
  body_type:string;

  @type("number")
  wing_type:string;

  @type("number")
  engine_type:string;

  @type("number")
  weapons_type:string;

  @type("number")
  rank:number; //The current ranking of the ship which corresponds to which wave to start on

  createdAt:number;

  inGame:number;

  constructor(opts) {
    super(opts);
    this.registerBehaviour(new KeyboardMovementBehaviour(this));
  }

  toSaveObject():any {
    onst baseObj:any = pick(this, [
      'username', 'name', 'uuid', 'body_type', 'wing_type', 'engine_type', 'weapon_type', 'ranks', 'inGame', 'createdAt'
    ]);
    return baseObj;
  }

}
