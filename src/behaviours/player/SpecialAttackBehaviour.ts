import { Behaviour } from '../behaviour';
import { C } from '../../constants';
import { Bounds } from '../../helpers/Bounds';

export class SpecialAttackBehaviour extends Behaviour {


  constructor(target) {
    super('special_attack', target);
  }

  public onEvent() {

  }

}
