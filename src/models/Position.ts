import { Schema, type} from '@colyseus/schema';
import { C } from '../Constants';

export class Position  extends Schema {
  @type("number")
  x: number;

  @type("number")
  y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  distanceTo(another: Position) {
    const dx: number = this.x - another.x;
    const dy: number = this.y - another.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  magnitude(): number {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  add(another: Position) {
    this.x = this.x + another.x;
    this.y = this.y + another.y;
  }

  addN(n: number) {
    this.x = this.x + n;
    this.y = this.y + n;
  }

  sub(another: Position) {
    this.x = this.x - another.x;
    this.y = this.y - another.y;
  }

  div(another: Position) {
    this.x = this.x / another.x;
    this.y = this.y / another.y;
  }

  divN(n: number) {
    this.x = this.x / n;
    this.y = this.y / n;
  }

  mult(another: Position) {
    this.x = this.x * another.x;
    this.y = this.y * another.y;
  }

  capSpeed(speed: number) {
    if(this.magnitude() > speed) {
      const reduction: number = speed / this.magnitude();
      this.x *= reduction;
      this.y *= reduction;
    }
  }

  public static randomOnScreen(): Position {
    return new Position(C.RANDOM_X_ON_SCREEN, C.RANDOM_Y_ON_SCREEN);
  }
}
