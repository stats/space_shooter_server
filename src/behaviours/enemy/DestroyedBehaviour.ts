import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class DestroyedBehaviour extends Behaviour {

  start_y:number;

  constructor(target:any, ) {
    super('destroyed', target);
  }

  onEvent() {
    this.target.$state.removeEnemy(this.target);
  }
}
