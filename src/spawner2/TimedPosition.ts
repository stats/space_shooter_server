export class TimedPosition extends Position {

  time: number;

  constructor(time: number, x: number, y: number) {
    super(x, y);
    this.time = time;
  }
}
