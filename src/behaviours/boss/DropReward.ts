import { Behaviour } from '../behaviour';
import { Enemy } from '../../models/Enemy';

export class DropReward extends Behaviour {

  target: Enemy;

  constructor(target: Enemy) {
    super('destroyed', target);
  }

  onEvent(): void {
    /**
     * Create a reward crystal
     **/
     let drop:Drop = new Drop({ position: this.target.position.clone()} ));
     this.target.$state.addDrop(drop);
  }
}
