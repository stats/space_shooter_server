import { Behaviour } from '../behaviour';
import { Drop, Enemy } from '../../models';

export class DropReward extends Behaviour {

  target: Enemy;

  constructor(target: Enemy) {
    super('destroyed', target);
  }

  onEvent(): void {
    /**
     * Create a reward crystal
     **/
     const drop: Drop = new Drop({ position: this.target.position.clone()});
     console.log("Drop Released: ", drop);
     this.target.$state.addDrop(drop);
  }
}
