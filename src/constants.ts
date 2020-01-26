import { Bounds } from './helpers/Bounds';

/* Game constants*/
export class C {
  public static BOUNDS:Bounds = new Bounds(0, 1600, 0, 900);
  public static SPAWN_OFFSET:number = 96; //This may need to be bigger to provide more warning, if warning is provided
  public static CIRCLE:number = 0;
  public static RECTANGLE:number = 1;
  public static SHIP_BULLET:number = 0;
  public static ENEMY_BULLET:number = 1;
}

/* collision layers used by rbush */
export class L {
  public static SHIP:number = 0;
  public static ENEMIES:number = 1;
  public static ENEMY_BULLETS:number = 2;
  public static SHIP_BULLETS:number = 3;
}

export class CT {
  public static CIRCLE:number = 0;
  public static ELLIPSE:number = 1;
  public static BOX:number = 2;
}

export class S {
  public static TOP:number = 0;
  public static LEFT:number = 1;
  public static RIGHT:number = 2;
}
