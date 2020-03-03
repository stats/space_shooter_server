import { Boss } from '../Boss';
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
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("primary", new EagleAttack(this));
    this.registerBehaviour("path", new EagleMovement(this));
    this.registerBehaviour("reward", new DropReward(this));
  }

}
