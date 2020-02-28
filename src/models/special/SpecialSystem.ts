import { Ship } from '../Ship';

export class SpecialSystem {

  protected target: Ship;
  public duration = 0;
  protected timer = 0;
  public amount = 0;
  protected active = false;

  constructor(target: Ship) {
    this.target = target;
  }

  public handleEvent(): void {
    // Do nothing.
  }
  public handleUpdate(deltaTime: number): void {
    // Do nothing.
  }

}
