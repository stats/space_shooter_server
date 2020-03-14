import { Behaviour, Ship } from '../../Internal';

export class ShipDestroyedBehaviour extends Behaviour {

  target: Ship;

  constructor(target: Ship) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeShip(this.target);
  }
}
