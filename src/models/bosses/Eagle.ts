import { Enemy } from '../Enemy';
import { EagleAttack } from '../../behaviours/boss/EagleAttack';
import { EagleMovement } from '../../behaviours/boss/EagleMovement';
import { DropReward } from '../../behaviours/boss/DropReward';
import { GameState } from '../GameState';
import { Position } from '../Position';

export enum EagleState {
  WAIT,
  ENTER_SCREEN,
  ATTACK,
  SPAWN,
  MOVE
}

export class Eagle extends Boss {

  constructor(options) {
    super(options);
    this.position = new Position(800, 1200);
    this.state = EagleState.ENTER_SCREEN;

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

    this.radius = 100;
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("primary", new EagleAttack(this));
    this.registerBehaviour("path", new EagleMovement(this));
    this.registerBehaviour("reward", new DropReward(this));
  }

}
