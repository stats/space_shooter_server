import { Behaviour, Drop, Enemy } from '../../Internal';

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
     this.target.$state.addDrop(drop);
  }
}
