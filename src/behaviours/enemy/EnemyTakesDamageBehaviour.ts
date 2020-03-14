import { Behaviour, Enemy, Entity, Ship } from '../../Internal';

export class EnemyTakesDamageBehaviour extends Behaviour {

  private _destroyed = false;

  target: Enemy;

  constructor(target: Enemy) {
    super('take_damage', target);
  }

  public onEvent(args: {damage: number; firedBy?: Entity}): void {
    this.target.health = Math.max(this.target.health - args.damage, 0);
    if(this.target.health <= 0 && !this._destroyed) {
      if(args.firedBy && args.firedBy instanceof Ship) {
        const ship = args.firedBy as Ship;
        ship.addKill(this.target.$state.currentWave, this.target.modelType);
      }
      this._destroyed = true;
      this.target.handleEvent('destroyed');
    }
  }

}
