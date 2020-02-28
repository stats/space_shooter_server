import { Bounds } from './helpers/Bounds';

/* Game constants*/
export class C {
  public static BOUNDS: Bounds = new Bounds(0, 1600, 0, 900);
  public static SPAWN_OFFSET = 96; //This may need to be bigger to provide more warning, if warning is provided
  public static CIRCLE = 0;
  public static RECTANGLE = 1;
  public static SHIP_BULLET = 0;
  public static ENEMY_BULLET = 1;

  public static get RANDOM_X_ON_SCREEN(): number {
    return Math.random() * ( C.BOUNDS.maxX - C.BOUNDS.minX - C.SPAWN_OFFSET*2 ) + C.SPAWN_OFFSET;
  }

  public static get RANDOM_Y_ON_SCREEN(): number {
    return Math.random() * ( C.BOUNDS.maxY - C.BOUNDS.minY - C.SPAWN_OFFSET*2 ) + C.SPAWN_OFFSET;
  }
}

/* collision layers used by rbush */
export class L {
  public static SHIP = 0;
  public static ENEMIES = 1;
  public static ENEMY_BULLETS = 2;
  public static SHIP_BULLETS = 3;
}

export class CT {
  public static CIRCLE = 0;
  public static ELLIPSE = 1;
  public static BOX = 2;
}

export class S {
  public static TOP = 0;
  public static LEFT = 1;
  public static RIGHT = 2;
}
