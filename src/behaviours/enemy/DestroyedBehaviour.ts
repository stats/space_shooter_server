import { Behaviour } from '../behaviour';
import { C } from '../../Constants';

export class DestroyedBehaviour extends Behaviour {

  constructor(target: any) {
    super('destroyed', target);
  }

  onEvent() {
    this.target.$state.removeEnemy(this.target);
  }
}
