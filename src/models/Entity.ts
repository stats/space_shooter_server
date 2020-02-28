import { Schema, type } from "@colyseus/schema";
import { merge } from 'lodash';
import { GameState } from './GameState';
import { Position } from './Position';
import { CT } from '../Constants';

import { v4 as uuid } from 'uuid';

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

  protected $behaviours: any = {};

  constructor(options:any) {
    super();
    merge(this, options);
    if(!this.position) this.position = new Position(0, 0);
    if(options && options.x) this.position.x = options.x;
    if(options && options.y) this.position.y = options.y;
    if(!this.uuid) this.uuid = uuid();
  }

  public registerBehaviours(list: any[]): void {
    for(const item of list) {
      this.registerBehaviour(item[0], item[1]);
    }
  }

  public registerBehaviour(key: string, behaviour: any): void {
    this.$behaviours[key] = behaviour;
    behaviour.onRegistered();
  }

  public removeBehaviour(key: string): void {
    this.$behaviours[key].onRemoved();
    delete(this.$behaviours[key]);
  }

  public removeAllBehaviours(): void {
    for(const key in this.$behaviours) {
      this.removeBehaviour(key);
    }
  }

  public enableBehaviour(key: string): void {
    this.$behaviours[key].enable();
  }

  public disableBehaviour(key: string): void {
    this.$behaviours[key].disable();
  }

  public isBehavourEnabled(key: string): boolean {
    return this.$behaviours[key].isEnabled();
  }

  public handleEvent(eventType: string, args?: any): void {
    let handledEvent = false;
    for(const key in this.$behaviours) {
      const behaviour = this.$behaviours[key];
      if(behaviour.event_type == eventType && behaviour.isEnabled()) {
        behaviour.onEvent(args);
        handledEvent = true;
      }
    }
    if(!handledEvent) {
      console.warn('[Entity]', eventType, 'not handled in', this.uuid);
    }
  }

  /**
   * Iterates through the behaviours and fires their onUpdate method
   **/
  onUpdate(deltaTime: number): void {
    for(const key in this.$behaviours) {
      const behaviour = this.$behaviours[key];
      if(behaviour.isEnabled()) {
        behaviour.onUpdate(deltaTime);
      }
    }
  }

  public getBulletSpawnLocation(): Position {
    return new Position(this.position.x + this.bullet_offset_x, this.position.y + this.bulletOffsetY);
  }

  onInitGame(state: GameState): void {
    this.$state = state;
  };

}
