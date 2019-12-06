import { Schema, type} from '@colyseus/schema';

export class Position  extends Schema {
  @type("number")
  x:number;

  @type("number")
  y:number;

  constructor(x:number, y:number) {
    super();
    this.x = x;
    this.y = y;
  }

  distanceTo(another:Position) {
    let dx:number = this.x - another.x;
    let dy:number = this.y - another.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}
