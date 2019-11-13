import { Schema, type } from "@colyseus/schema";
import { KeyboardMovementBehaviour } from '../behaviours/player/KeyboardMovementBehaviour';
import { CollidesWithEnemy } from '../behaviours/player/CollidesWithEnemy';
import { CollidesWithEnemyBullet } from '../behaviours/player/CollidesWithEnemyBullet';

import { GameRoom } from '../rooms/GameRoom';

import { Entity } from './entity';

import { pick } from 'lodash';

export class Ship extends Entity {

  sessionId?:number;
  connected:boolean = false;

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

  radius:number;

  createdAt:number;

  inGame:number;

  constructor(opts) {
    super(opts);
  }

  onInitGame(room:GameRoom) {
    super.onInitGame(room);
    this.registerBehaviour(new KeyboardMovementBehaviour(this));
    this.registerBehaviour(new CollidesWithEnemy(this, this.$room.state.enemies));
    this.registerBehaviour(new CollidesWithEnemyBullet(this, this.$room.state.enemy_bullets));
  }

  toSaveObject():any {
    const baseObj:any = pick(this, [
      'username', 'name', 'uuid', 'body_type', 'wing_type', 'engine_type', 'weapon_type', 'ranks', 'diameter', 'width', 'height', 'inGame', 'createdAt'
    ]);
    return baseObj;
  }

}
