import { Behaviour } from '../behaviour';
import { C } from '../../Constants';

export class DestroyedBehaviour extends Behaviour {

  start_y:number;

  constructor(target:any, ) {
    super('destroyed', target);
  }

  onEvent() {
    this.target.$state.removeShip(this.target);
  }
}
