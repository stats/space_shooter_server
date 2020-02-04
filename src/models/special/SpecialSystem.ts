import { Ship } from '../ship';

export class SpecialSystem {

  protected target:Ship;
  public duration:number = 0;
  protected timer:number = 0;
  protected amount:number = 0;
  protected active:boolean = false;

  constructor(target:Ship){
    this.target = target;
  }

  public handleEvent() {}
  public handleUpdate(deltaTime:number) {}

}
