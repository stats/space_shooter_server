import { Behaviour } from '../behaviour';
import { C } from '../../Constants';

export class DestroyedBehaviour extends Behaviour {

  startY: number;

  constructor(target: any, ) {
    super('destroyed', target);
  }

  onEvent() {
    this.target.$state.removeShip(this.target);
  }
}
