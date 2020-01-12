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

export class SHIP {
  public static DAMAGE_BASE:number = 1;
  public static DAMAGE_GROWTH:number = 1;

  public static RANGE_BASE:number = 0;
  public static RANGE_GROWTH:number = 25;


  public static FIRE_RATE_BASE:number = 0;
  public static FIRE_RATE_GROWTH:number = 250;

  public static SPEED_BASE:number = 100;
  public static SPEED_GROWTH:number = 50;

  public static ACCELLERATION_BASE:number = 100;
  public static ACCELLERATION_GROWTH:number = 50;

  public static SHIELDS_BASE:number = 1;
  public static SHIELDS_GROWTH:number = 1;

  public static SHIELD_RECHARGE_BASE:number = 30000;
  public static SHIELD_RECHARGE_GROWTH:number = 750;

  /**
  There are levels of ships. At base level ships have 5 upgrade points.
  Mark II have 7 upgrade.
  Mark III have 9
  MARK IV 11
  MARK V 13
  **/
  public static TYPES = {
    "explorer" : {
      name: "Explorer",
      upgrade_weapon_damage: 0,
      upgrade_weapon_range: 0,
      upgrade_weapon_fire_rate: 0,
      upgrade_accelleration: 2,
      upgrade_speed: 2,
      upgrade_shields_max: 1,
      upgrade_shields_recharge: 0
    },
    "scout" : {
      name: "Scout",
      upgrade_weapon_damage: 0,
      upgrade_weapon_range: 0,
      upgrade_weapon_fire_rate: 0,
      upgrade_accelleration: 2,
      upgrade_speed: 3,
      upgrade_shields_max: 0,
      upgrade_shields_recharge: 0
    },
    "gunship" : {
      name: "Gunship",
      upgrade_weapon_damage: 2,
      upgrade_weapon_range: 2,
      upgrade_weapon_fire_rate: 1,
      upgrade_accelleration: 0,
      upgrade_speed: 0,
      upgrade_shields_max: 0,
      upgrade_shields_recharge: 0
    },
    "fighter" : {
      name: "Fighter",
      upgrade_weapon_damage: 1,
      upgrade_weapon_range: 0,
      upgrade_weapon_fire_rate: 0,
      upgrade_accelleration: 1,
      upgrade_speed: 1,
      upgrade_shields_max: 1,
      upgrade_shields_recharge: 1
    },
    "defender" : {
      name: "Defender",
      upgrade_weapon_damage: 1,
      upgrade_weapon_range: 0,
      upgrade_weapon_fire_rate: 0,
      upgrade_accelleration: 0,
      upgrade_speed: 0,
      upgrade_shields_max: 2,
      upgrade_shields_recharge: 2
    },
    "fighter2" : {
      name: "Fighter Mark II",
      upgrade_weapon_damage: 2,
      upgrade_weapon_range: 0,
      upgrade_weapon_fire_rate: 1,
      upgrade_accelleration: 1,
      upgrade_speed: 1,
      upgrade_shields_max: 1,
      upgrade_shields_recharge: 1
    }
  }
}

export class WEAPONS {
  public static PRIMARY = [
    {
      system_type: Basic,
      damage: 1,
      range: 500,
      speed: 400,
      fire_rate: 500,
      radius: 15
    },
    {
      system_type: Blaster,
      damage: 2,
      range: 300,
      speed: 250,
      fire_rate: 750,
      radius: 15
    }
  ];

  public static SPECIAL = [
    {
      system_type: EmergencyBrake,
      fire_rate: 2000
    },
    {
      system_type: Shotgun,
      fire_rate: 3000
    },
    {
      system_type: ScatterShot,
      fire_rate: 5000
    }
  ];
}
