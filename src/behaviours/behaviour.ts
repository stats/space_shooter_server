export class Behaviour {
  public target: any;
  public eventType: string;

  constructor(type: string, target: any) {
    this.eventType = type;
    this.target = target;
  }

  public onEvent(args: any) {}
  public onUpdate(deltaTime: number) {}
}
