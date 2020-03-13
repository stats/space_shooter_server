import { Behaviour } from '../behaviour';
import { CollisionHelper } from '../../helpers/CollisionHelper';
import { Drop, Ship } from '../../models';

export class CollectDrop extends Behaviour {

  target: Ship;

  constructor(target: Ship) {
    super('CollectDrop', target);
  }

  public onUpdate(deltaTime: number): void {
    if(this.target.tempUpgradeTimer > 0) {
      this.target.tempUpgradeTimer -= deltaTime;
      if(this.target.tempUpgradeTimer <= 0) {
        this.target.clearTempUpgrades();
      }
    }
  }

  public onEvent(drop: Drop): void {
    this.target.generateTempUpgrades(drop.modelType);
  }
}
