import { Schema, type } from "@colyseus/schema";
import { merge } from 'lodash';
import { GameState } from './GameState';

export class Entity extends Schema {

  @type('string')
  uuid:string;

  @type('number')
  x:number = 0;

  @type('number')
  y:number = 0;

  diameter:number;
  width:number;
  height:number;

  bullet_offset_x:number = 0;
  bullet_offset_y:number = ;

  collision_type:number;

  public $state:GameState;

  protected $behaviours:any[] = [];

  constructor(opts:any) {
    super();
    merge(this, opts);
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

  public getBulletSpawnLocation() {
    return {
      x: this.x + this.bullet_offset_x,
      y: this.y + this.bullet_offset_y
    }
  }

  onInitGame(state:GameState) {
    this.$state = state;
  };

  protected onEvent(event_type:string, args:any) {
    for(let i = 0; i < this.$behaviours.length; i++) {
      let behaviour = this.$behaviours[i];
      if(behaviour.event_type == event_type) {
        behaviour.onEvent(args);
      }
    }
  }

  destroy() { }

  onUpdate(deltaTime:number) {
    for(let i = 0; i < this.$behaviours.length; i++) {
      this.$behaviours[i].onUpdate(deltaTime);
    }
  }

}
