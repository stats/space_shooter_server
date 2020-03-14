import { Behaviour, CollisionHelper, Drop, Ship } from '../../Internal';

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
