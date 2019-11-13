import { Bounds } from './helpers/Bounds';

/* Game constants*/
export class C {
  public static BOUNDS:Bounds = new Bounds(0, 1024, 0, 768);
  public static SPAWN_TOP:Number = 1024;
  public static SPAWN_SIDE:Number = 512;
  public static SPAWN_OFFSET:Number = 96; //This may need to be bigger to provide more warning, if warning is provided
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
