export class SHIP {
  public static TYPES = {
    "explorer1": {
      "damage_base": 4,
      "damage_growth": 1,
      "range_base": 300,
      "range_growth": 10,
      "fire_rate_base": 2000,
      "fire_rate_growth": 25,
      "speed_base": 250,
      "speed_growth": 12,
      "accelleration_base": 250,
      "accelleration_growth": 12,
      "shields_base": 3,
      "shields_growth": 1,
      "shield_recharge_base": 28000,
      "shield_recharge_growth": 500,
      "special_base": 0.05,
      "special_growth": 0.005
    },
    "explorer2": {
      "damage_base": 5,
      "damage_growth": 1,
      "range_base": 350,
      "range_growth": 10,
      "fire_rate_base": 1950,
      "fire_rate_growth": 25,
      "speed_base": 300,
      "speed_growth": 14,
      "accelleration_base": 300,
      "accelleration_growth": 14,
      "shields_base": 4,
      "shields_growth": 1,
      "shield_recharge_base": 27500,
      "shield_recharge_growth": 500,
      "special_base": 0.05,
      "special_growth": 0.005
    },
    "explorer3": {
      "damage_base": 6,
      "damage_growth": 1,
      "range_base": 400,
      "range_growth": 10,
      "fire_rate_base": 1900,
      "fire_rate_growth": 25,
      "speed_base": 350,
      "speed_growth": 18,
      "accelleration_base": 350,
      "accelleration_growth": 18,
      "shields_base": 5,
      "shields_growth": 1,
      "shield_recharge_base": 27000,
      "shield_recharge_growth": 500,
      "special_base": 0.05,
      "special_growth": 0.01
    },
    "explorer4": {
      "damage_base": 8,
      "damage_growth": 2,
      "range_base": 450,
      "range_growth": 10,
      "fire_rate_base": 1850,
      "fire_rate_growth": 25,
      "speed_base": 400,
      "speed_growth": 22,
      "accelleration_base": 400,
      "accelleration_growth": 22,
      "shields_base": 6,
      "shields_growth": 1,
      "shield_recharge_base": 26500,
      "shield_recharge_growth": 500,
      "special_base": 0.05,
      "special_growth": 0.01
    },
    "explorer5": {
      "damage_base": 10,
      "damage_growth": 2,
      "range_base": 500,
      "range_growth": 10,
      "fire_rate_base": 1800,
      "fire_rate_growth": 25,
      "speed_base": 450,
      "speed_growth": 25,
      "accelleration_base": 450,
      "accelleration_growth": 25,
      "shields_base": 8,
      "shields_growth": 2,
      "shield_recharge_base": 26000,
      "shield_recharge_growth": 500,
      "special_base": 0.05,
      "special_growth": 0.015
    },
    "scout1": {
      "damage_base": 4,
      "damage_growth": 1,
      "range_base": 320,
      "range_growth": 11,
      "fire_rate_base": 2000,
      "fire_rate_growth": 25,
      "speed_base": 300,
      "speed_growth": 14,
      "accelleration_base": 300,
      "accelleration_growth": 14,
      "shields_base": 2,
      "shields_growth": 1,
      "shield_recharge_base": 30000,
      "shield_recharge_growth": 500,
      "special_base": 0.01,
      "special_growth": 0.01
    },
    "scout2": {
      "damage_base": 5,
      "damage_growth": 1,
      "range_base": 370,
      "range_growth": 11,
      "fire_rate_base": 1950,
      "fire_rate_growth": 25,
      "speed_base": 350,
      "speed_growth": 16,
      "accelleration_base": 350,
      "accelleration_growth": 14,
      "shields_base": 3,
      "shields_growth": 1,
      "shield_recharge_base": 29500,
      "shield_recharge_growth": 500,
      "special_base": 0.01,
      "special_growth": 0.01
    },
    "scout3": {
      "damage_base": 6,
      "damage_growth": 1,
      "range_base": 420,
      "range_growth": 11,
      "fire_rate_base": 1900,
      "fire_rate_growth": 25,
      "speed_base": 400,
      "speed_growth": 18,
      "accelleration_base": 400,
      "accelleration_growth": 18,
      "shields_base": 4,
      "shields_growth": 1,
      "shield_recharge_base": 29000,
      "shield_recharge_growth": 500,
      "special_base": 0.015,
      "special_growth": 0.015
    },
    "scout4": {
      "damage_base": 8,
      "damage_growth": 2,
      "range_base": 470,
      "range_growth": 11,
      "fire_rate_base": 1850,
      "fire_rate_growth": 25,
      "speed_base": 450,
      "speed_growth": 22,
      "accelleration_base": 450,
      "accelleration_growth": 22,
      "shields_base": 5,
      "shields_growth": 1,
      "shield_recharge_base": 28500,
      "shield_recharge_growth": 500,
      "special_base": 0.02,
      "special_growth": 0.015
    },
    "scout5": {
      "damage_base": 10,
      "damage_growth": 2,
      "range_base": 520,
      "range_growth": 11,
      "fire_rate_base": 1800,
      "fire_rate_growth": 25,
      "speed_base": 500,
      "speed_growth": 25,
      "accelleration_base": 500,
      "accelleration_growth": 25,
      "shields_base": 6,
      "shields_growth": 2,
      "shield_recharge_base": 28000,
      "shield_recharge_growth": 500,
      "special_base": 0.025,
      "special_growth": 0.02
    },
    "gunship1": {
      "damage_base": 6,
      "damage_growth": 2,
      "range_base": 350,
      "range_growth": 12,
      "fire_rate_base": 1600,
      "fire_rate_growth": 30,
      "speed_base": 200,
      "speed_growth": 12,
      "accelleration_base": 200,
      "accelleration_growth": 50,
      "shields_base": 2,
      "shields_growth": 1,
      "shield_recharge_base": 30000,
      "shield_recharge_growth": 500,
      "special_base": 0,
      "special_growth": 0.005
    },
    "gunship2": {
      "damage_base": 8,
      "damage_growth": 2,
      "range_base": 400,
      "range_growth": 13,
      "fire_rate_base": 1550,
      "fire_rate_growth": 30,
      "speed_base": 225,
      "speed_growth": 13,
      "accelleration_base": 225,
      "accelleration_growth": 12,
      "shields_base": 3,
      "shields_growth": 1,
      "shield_recharge_base": 29500,
      "shield_recharge_growth": 500,
      "special_base": 0,
      "special_growth": 0.005
    },
    "gunship3": {
      "damage_base": 12,
      "damage_growth": 3,
      "range_base": 450,
      "range_growth": 14,
      "fire_rate_base": 1500,
      "fire_rate_growth": 35,
      "speed_base": 250,
      "speed_growth": 14,
      "accelleration_base": 250,
      "accelleration_growth": 14,
      "shields_base": 4,
      "shields_growth": 1,
      "shield_recharge_base": 29000,
      "shield_recharge_growth": 500,
      "special_base": 0,
      "special_growth": 0.005
    },
    "gunship4": {
      "damage_base": 16,
      "damage_growth": 4,
      "range_base": 500,
      "range_growth": 15,
      "fire_rate_base": 1450,
      "fire_rate_growth": 40,
      "speed_base": 275,
      "speed_growth": 15,
      "accelleration_base": 275,
      "accelleration_growth": 14,
      "shields_base": 5,
      "shields_growth": 2,
      "shield_recharge_base": 28500,
      "shield_recharge_growth": 500,
      "special_base": 0,
      "special_growth": 0.005
    },
    "gunship5": {
      "damage_base": 20,
      "damage_growth": 5,
      "range_base": 550,
      "range_growth": 16,
      "fire_rate_base": 1400,
      "fire_rate_growth": 45,
      "speed_base": 300,
      "speed_growth": 18,
      "accelleration_base": 300,
      "accelleration_growth": 18,
      "shields_base": 6,
      "shields_growth": 2,
      "shield_recharge_base": 28000,
      "shield_recharge_growth": 500,
      "special_base": 0,
      "special_growth": 0.005
    },
    "defender1": {
      "damage_base": 4,
      "damage_growth": 1,
      "range_base": 300,
      "range_growth": 10,
      "fire_rate_base": 2000,
      "fire_rate_growth": 50,
      "speed_base": 200,
      "speed_growth": 12,
      "accelleration_base": 200,
      "accelleration_growth": 12,
      "shields_base": 5,
      "shields_growth": 2,
      "shield_recharge_base": 26000,
      "shield_recharge_growth": 600,
      "special_base": 0,
      "special_growth": 0.005
    },
    "defender2": {
      "damage_base": 5,
      "damage_growth": 1,
      "range_base": 350,
      "range_growth": 10,
      "fire_rate_base": 1950,
      "fire_rate_growth": 25,
      "speed_base": 225,
      "speed_growth": 13,
      "accelleration_base": 225,
      "accelleration_growth": 12,
      "shields_base": 7,
      "shields_growth": 2,
      "shield_recharge_base": 25000,
      "shield_recharge_growth": 650,
      "special_base": 0.01,
      "special_growth": 0.005
    },
    "defender3": {
      "damage_base": 6,
      "damage_growth": 2,
      "range_base": 400,
      "range_growth": 10,
      "fire_rate_base": 1900,
      "fire_rate_growth": 25,
      "speed_base": 250,
      "speed_growth": 14,
      "accelleration_base": 250,
      "accelleration_growth": 14,
      "shields_base": 9,
      "shields_growth": 2,
      "shield_recharge_base": 24000,
      "shield_recharge_growth": 700,
      "special_base": 0.01,
      "special_growth": 0.01
    },
    "defender4": {
      "damage_base": 8,
      "damage_growth": 2,
      "range_base": 450,
      "range_growth": 10,
      "fire_rate_base": 1850,
      "fire_rate_growth": 25,
      "speed_base": 275,
      "speed_growth": 15,
      "accelleration_base": 275,
      "accelleration_growth": 14,
      "shields_base": 12,
      "shields_growth": 2,
      "shield_recharge_base": 23000,
      "shield_recharge_growth": 750,
      "special_base": 0.015,
      "special_growth": 0.01
    },
    "defender5": {
      "damage_base": 10,
      "damage_growth": 3,
      "range_base": 500,
      "range_growth": 10,
      "fire_rate_base": 1800,
      "fire_rate_growth": 25,
      "speed_base": 300,
      "speed_growth": 18,
      "accelleration_base": 300,
      "accelleration_growth": 18,
      "shields_base": 15,
      "shields_growth": 3,
      "shield_recharge_base": 22000,
      "shield_recharge_growth": 800,
      "special_base": 0.02,
      "special_growth": 0.015
    },
    "fighter1": {
      "damage_base": 5,
      "damage_growth": 2,
      "range_base": 325,
      "range_growth": 11,
      "fire_rate_base": 1800,
      "fire_rate_growth": 30,
      "speed_base": 220,
      "speed_growth": 12,
      "accelleration_base": 220,
      "accelleration_growth": 12,
      "shields_base": 3,
      "shields_growth": 1,
      "shield_recharge_base": 29000,
      "shield_recharge_growth": 500,
      "special_base": 0.01,
      "special_growth": 0.005
    },
    "fighter2": {
      "damage_base": 7,
      "damage_growth": 2,
      "range_base": 375,
      "range_growth": 12,
      "fire_rate_base": 1750,
      "fire_rate_growth": 30,
      "speed_base": 270,
      "speed_growth": 13,
      "accelleration_base": 270,
      "accelleration_growth": 13,
      "shields_base": 4,
      "shields_growth": 1,
      "shield_recharge_base": 28000,
      "shield_recharge_growth": 525,
      "special_base": 0.01,
      "special_growth": 0.005
    },
    "fighter3": {
      "damage_base": 9,
      "damage_growth": 3,
      "range_base": 425,
      "range_growth": 13,
      "fire_rate_base": 1700,
      "fire_rate_growth": 35,
      "speed_base": 290,
      "speed_growth": 14,
      "accelleration_base": 290,
      "accelleration_growth": 14,
      "shields_base": 5,
      "shields_growth": 1,
      "shield_recharge_base": 27000,
      "shield_recharge_growth": 550,
      "special_base": 0.015,
      "special_growth": 0.005
    },
    "fighter4": {
      "damage_base": 13,
      "damage_growth": 3,
      "range_base": 475,
      "range_growth": 15,
      "fire_rate_base": 1650,
      "fire_rate_growth": 35,
      "speed_base": 310,
      "speed_growth": 15,
      "accelleration_base": 310,
      "accelleration_growth": 15,
      "shields_base": 6,
      "shields_growth": 2,
      "shield_recharge_base": 26000,
      "shield_recharge_growth": 575,
      "special_base": 0.015,
      "special_growth": 0.005
    },
    "fighter5": {
      "damage_base": 16,
      "damage_growth": 4,
      "range_base": 525,
      "range_growth": 15,
      "fire_rate_base": 1600,
      "fire_rate_growth": 40,
      "speed_base": 330,
      "speed_growth": 18,
      "accelleration_base": 330,
      "accelleration_growth": 18,
      "shields_base": 8,
      "shields_growth": 2,
      "shield_recharge_base": 25000,
      "shield_recharge_growth": 600,
      "special_base": 0.02,
      "special_growth": 0.01
    }
  }
}