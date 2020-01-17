import { Schema, type } from "@colyseus/schema";
import { merge } from 'lodash';
import { GameState } from './GameState';
import { Position } from './position';
import { CT } from '../constants';
const uuid = require('uuid/v4');

export class Entity extends Schema {

  @type('string')
  uuid:string;

  @type(Position)
  position:Position = new Position(0, 0);

  bullet_offset_x:number = 0;
  bullet_offset_y:number = 0;

  collision_type:number = CT.CIRCLE;
  radius:number;
  width:number;
  height:number;
  radiusX:number;
  radiusY:number;

  public $state:GameState;

  protected $behaviours:any[] = [];

  constructor(opts:any) {
    super();
    merge(this, opts);
    if(!this.position) this.position = new Position(0, 0);
    if(opts && opts.x) this.position.x = opts.x;
    if(opts && opts.y) this.position.y = opts.y;
    if(!this.uuid) this.uuid = uuid();
  }

  protected registerBehaviours(list:any[]) {
    for(var item of list) {
      this.registerBehaviour(item);
    }
  }

  protected registerBehaviour(behaviour:any) {
    this.$behaviours.push(behaviour);
  }

  protected removeBehaviour(behaviour:any) {
    for(let i = this.$behaviours.length - 1; i >=0; i--) {
      if(this.$behaviours[i] == behaviour) {
        this.$behaviours.splice(i, 1);
      }
    }
  }

  protected removeAllBehaviours() {
    this.$behaviours = [];
  }

  public getBulletSpawnLocation() {
    return {
      x: this.position.x + this.bullet_offset_x,
      y: this.position.y + this.bullet_offset_y
    }
  }

  onInitGame(state:GameState) {
    this.$state = state;
  };

  public handleEvent(event_type:string, args?:any) {
    let handled_event = false;
    for(let i = 0; i < this.$behaviours.length; i++) {
      let behaviour = this.$behaviours[i];
      if(behaviour.event_type == event_type) {
        behaviour.onEvent(args);
        handled_event = true;
      }
    }
    if(!handled_event) {
      console.log('Warning:', event_type, 'not handled in', this);
    }
  }

  onUpdate(deltaTime:number) {
    for(let i = 0; i < this.$behaviours.length; i++) {
      this.$behaviours[i].onUpdate(deltaTime);
    }
  }

}
