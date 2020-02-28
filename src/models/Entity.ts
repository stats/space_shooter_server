import { Schema, type } from "@colyseus/schema";
import { merge } from 'lodash';
import { GameState } from './GameState';
import { Position } from './Position';
import { CT } from '../Constants';
const uuid = require('uuid/v4');

export class Entity extends Schema {

  @type('string')
  uuid: string;

  @type(Position)
  position: Position = new Position(0, 0);

  @type('boolean')
  overrideAngle = false;

  @type('number')
  angle = 0;

  bullet_offset_x = 0;
  bulletOffsetY = 0;

  collisionType: number = CT.CIRCLE;
  radius = 25;
  width: number;
  height: number;
  radiusX: number;
  radiusY: number;

  @type('boolean')
  bulletInvulnerable = false;

  @type('boolean')
  collisionInvulnerable = false;

  @type('boolean')
  invisible = false;

  public $state: GameState;

  protected $behaviours: any[] = [];

  constructor(opts: any) {
    super();
    merge(this, opts);
    if(!this.position) this.position = new Position(0, 0);
    if(opts && opts.x) this.position.x = opts.x;
    if(opts && opts.y) this.position.y = opts.y;
    if(!this.uuid) this.uuid = uuid();
  }

  public registerBehaviours(list: any[]) {
    for(const item of list) {
      this.registerBehaviour(item);
    }
  }

  public registerBehaviour(behaviour: any) {
    this.$behaviours.push(behaviour);
  }

  public removeBehaviour(behaviour: any) {
    for(let i = this.$behaviours.length - 1; i >=0; i--) {
      if(this.$behaviours[i] == behaviour) {
        this.$behaviours.splice(i, 1);
      }
    }
  }

  public removeAllBehaviours() {
    this.$behaviours = [];
  }

  public getBulletSpawnLocation() {
    return {
      x: this.position.x + this.bullet_offset_x,
      y: this.position.y + this.bulletOffsetY
    }
  }

  onInitGame(state: GameState) {
    this.$state = state;
  };

  public handleEvent(eventType: string, args?: any) {
    let handledEvent = false;
    for(let i = 0; i < this.$behaviours.length; i++) {
      const behaviour = this.$behaviours[i];
      if(behaviour.eventType == eventType) {
        behaviour.onEvent(args);
        handledEvent = true;
      }
    }
    if(!handledEvent) {
      console.log('Warning:', eventType, 'not handled in', this);
    }
  }

  onUpdate(deltaTime: number) {
    for(let i = 0; i < this.$behaviours.length; i++) {
      this.$behaviours[i].onUpdate(deltaTime);
    }
  }

}
