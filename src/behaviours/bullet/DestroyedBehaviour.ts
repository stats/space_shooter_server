import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class DestroyedBehaviour extends Behaviour {

  constructor(target:any, ) {
    super('destroyed', target);
  }

  onEvent() {
    this.target.$state.removeBullet(this.target);
  }
}
