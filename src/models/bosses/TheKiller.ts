import { Enemy } from '../Enemy';
import { TheKillerMovement } from '../../behaviours/boss/TheKillerMovement';
import { DropReward } from '../../behaviours/boss/DropReward';
import { Position } from '../Position';
import { CT } from '../../Constants';

export enum TheKillerState {
  ENTER_SCREEN,
  ATTACK,
  MOVE
}

export class TheKiller extends Enemy {

  constructor(options) {
    super(options);
    this.position = new Position(800, 1200);
    this.state = TheKillerState.ENTER_SCREEN;

    this.healthBase = 25;
    this.healthGrowth = 1;

    this.speedBase = 75;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.damageBase = 1;
    this.damageGrowth = 0.2;

    this.rangeBase = 1200;
    this.rangeGrowth = 0;

    this.modelType = "eagle";

    this.collisionType = CT.ELLIPSE;
    this.radiusX = 225;
    this.radiusY = 100;
  }

  onInitGame(state: any): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new TheKillerMovement(this));
    this.registerBehaviour("reward", new DropReward(this));
  }

}
