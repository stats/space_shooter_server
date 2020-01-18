import { Bounds } from './helpers/Bounds';
import { Basic } from './models/primary/basic';
import { Blaster } from './models/primary/blaster';

import {ScatterShot } from './models/special/scatter_shot';
import {EmergencyBrake } from './models/special/emergency_brake';
import { Shotgun } from './models/special/shotgun';

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
  public static TYPES = {
    "explorer1" : {
      name: "Explorer",
      damage_base: 4,
      damage_growth: 1,
      range_base: 0,
      range_growth: 25,
      fire_rate_base: 0,
      fire_rate_growth: 250,
      speed_base: 120,
      speed_growth: 60,
      accelleration_base: 120,
      accelleration_growth: 60,
      shields_base: 3,
      shields_growth: 1,
      shield_recharge_base: 28000,
      shield_recharge_growth: 750
    },
    "scout1" : {
      name: "Scout",
      damage_base: 4,
      damage_growth: 1,
      range_base: 0,
      range_growth: 25,
      fire_rate_base: 0,
      fire_rate_growth: 250,
      speed_base: 130,
      speed_growth: 70,
      accelleration_base: 130,
      accelleration_growth: 70,
      shields_base: 2,
      shields_growth: 1,
      shield_recharge_base: 30000,
      shield_recharge_growth: 750
    },
    "gunship1" : {
      name: "Gunship",
      damage_base: 6,
      damage_growth: 2,
      range_base: 0,
      range_growth: 30,
      fire_rate_base: 150,
      fire_rate_growth: 275,
      speed_base: 100,
      speed_growth: 50,
      accelleration_base: 100,
      accelleration_growth: 50,
      shields_base: 3,
      shields_growth: 1,
      shield_recharge_base: 30000,
      shield_recharge_growth: 750
    },
    "defender1" : {
      name: "Defender",
      damage_base: 4,
      damage_growth: 1,
      range_base: 0,
      range_growth: 25,
      fire_rate_base: 0,
      fire_rate_growth: 250,
      speed_base: 100,
      speed_growth: 50,
      accelleration_base: 100,
      accelleration_growth: 50,
      shields_base: 5,
      shields_growth: 2,
      shield_recharge_base: 26000,
      shield_recharge_growth: 850
    },
    "fighter1" : {
      name: "Fighter",
      damage_base: 5,
      damage_growth: 2,
      range_base: 25,
      range_growth: 30,
      fire_rate_base: 250,
      fire_rate_growth: 300,
      speed_base: 110,
      speed_growth: 55,
      accelleration_base: 110,
      accelleration_growth: 55,
      shields_base: 3,
      shields_growth: 1,
      shield_recharge_base: 29000,
      shield_recharge_growth: 800
    },
    "fighter2" : {
      name: "Fighter Mark II",
      damage_base: 1,
      damage_growth: 1,
      range_base: 0,
      range_growth: 25,
      fire_rate_base: 0,
      fire_rate_growth: 250,
      speed_base: 100,
      speed_growth: 50,
      accelleration_base: 100,
      accelleration_growth: 50,
      shields_base: 1,
      shields_growth: 1,
      shield_recharge_base: 30000,
      shield_recharge_growth: 750
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
