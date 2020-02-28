import { Ship } from '../Ship';

export class SpecialSystem {

  protected target: Ship;
  public duration = 0;
  protected timer = 0;
  protected amount = 0;
  protected active = false;

  constructor(target: Ship){
    this.target = target;
  }

  public handleEvent() {}
  public handleUpdate(deltaTime: number) {}

}
