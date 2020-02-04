import { Ship } from '../ship';

export class SpecialSystem {

  protected target:Ship;

  constructor(target:ship){
    this.target = target;
  }

  public handleEvent() {}
  public handleUpdate() {}

}
