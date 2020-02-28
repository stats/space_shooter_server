import { Behaviour } from '../behaviour';
import { Ship } from '../../models/Ship';

export class DestroyedBehaviour extends Behaviour {

  target: Ship;

  constructor(target: Ship) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeShip(this.target);
  }
}
