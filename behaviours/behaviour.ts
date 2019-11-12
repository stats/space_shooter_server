export class Behaviour {
  public target:any;
  public event_type:string;

  constructor(type:string, target:any) {
    this.event_type = type;
    this.target = target;
  }

  public handleEvent(args:any) {}
  public handleTick(deltaTime:number) {}
}
