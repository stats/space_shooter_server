import { Schema, type } from "@colyseus/schema";

export class Entity extends Schema {

  @type('string')
  uuid:string;

  @type('number')
  x:number;

  @type('number')
  y:number;

  $room:any;

  protected $behaviours:any[] = [];

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

  protected handleEvent(event_type:string, args:any) {
    for(let i = 0; i < this.$behaviours.length; i++) {
      let behaviour = this.$behaviours[i];
      if(behaviour.event_type == event_type) {
        behaviour.handleEvent(args);
      }
    }
  }

  tick(deltaTime:number) {
    for(let i = 0; i < this.$$behaviours.length; i++) {
      this.$$behaviours[i].handleTick(deltaTime);
    }
  }

}
