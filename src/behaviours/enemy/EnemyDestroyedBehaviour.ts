import { Behaviour, Enemy } from '../../Internal';

export class EnemyDestroyedBehaviour extends Behaviour {

  target: Enemy;

  constructor(target: Enemy) {
    super('destroyed', target);
  }

  onEvent(): void {
    this.target.$state.removeEnemy(this.target);
  }
}
