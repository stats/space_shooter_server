import { Behaviour } from '../behaviour';
import { Boss } from '../../models/Boss';

export class DropReward extends Behaviour {

  target: Boss;

  constructor(target: Boss) {
    super('destroyed', target);
  }

  onEvent(): void {
    /**
     * Create a reward crystal
     **/
  }
}
