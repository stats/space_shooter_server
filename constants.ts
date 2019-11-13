import { Bounds } from 'helpers/Bounds';

/* Game constants*/
export class C {
  public static BOUNDS:Bounds = new Bounds(0, 640, 0, 480);
  public static CIRCLE:number = 0;
  public static RECTANGLE:number = 1;
}

/* collision layers used by rbush */
export class L {
  public static SHIP:number = 0;
  public static ENEMIES:number = 1;
  public static ENEMY_BULLETS:number = 2;
  public static SHIP_BULLETS:number = 3;
}
