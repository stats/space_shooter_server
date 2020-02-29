import { WeaponCharge, EmergencyBrake, Thrusters,
RammingShield, Shotgun, ScatterShot, HyperSpeed, Invisibility,
Bomb, MissileBarage, MegaBomb, ShieldRecharge, ForceShield } from './models/special';

export class SPECIAL {
  public static TYPE = {
    "Weapon Charge": {
      'systemType': WeaponCharge,
      'amount': 2,
      'fireRate': 3000
    },
    "Shotgun": {
      'systemType': Shotgun,
      'fireRate': 5000,
      'unlockKey': "maxKills_Weapon Charge",
      'unlockCount': 200
    },
    "Bomb": {
      'systemType': Bomb,
      'fireRate': 5000,
      'unlockKey': "maxKills_Shotgun",
      'unlockCount': 200
    },
    "Mega Bomb": {
      'systemType': MegaBomb,
      'fireRate': 10000,
      'unlockKey': "maxKills_Bomb",
      'unlockCount': 200
    },
    "Scatter Shot": {
      'systemType': ScatterShot,
      'fireRate': 15000,
      'unlockKey': "maxKills_Mega Bomb",
      'unlockCount': 200
    },
    "Missile Barrage": {
      'systemType': MissileBarage,
      'fireRate': 5000,
      'unlockKey': "maxKills_Scatter Shot",
      'unlockCount': 200
    },
    "Emergency Brake": {
      'systemType': EmergencyBrake,
      'fireRate': 2000
    },
    "Shield Recharge": {
      'systemType': ShieldRecharge,
      'amount': 1,
      'fireRate': 15000,
      'unlockKey': "maxKills_Emergency Brake",
      'unlockCount': 200
    },
    "Ramming Shield": {
      'systemType': RammingShield,
      'duration': 4000,
      'fireRate': 10000,
      'unlockKey': "maxKills_Shield Recharge",
      'unlockCount': 200
    },
    "Force Shield": {
      'systemType': ForceShield,
      'duration': 3000,
      'fireRate': 15000,
      'unlockKey': "maxKills_Ramming Shield",
      'unlockCount': 200
    },
    "Thrusters": {
      'systemType': Thrusters,
      'amount': 2,
      'duration': 2000,
      'fireRate': 4000
    },
    "Hyper Speed": {
      'systemType': HyperSpeed,
      'amount': 1,
      'fireRate': 5000,
      'unlockKey': "maxKills_Thrusters",
      'unlockCount': 200
    },
    "Invisibility": {
      'systemType': Invisibility,
      'duration': 5000,
      'fireRate': 12000,
      'unlockKey': "maxKills_Hyper Speed",
      'unlockCount': 200
    },
  };
}
