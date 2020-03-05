import { WeaponCharge, EmergencyBrake, Thrusters,
RammingShield, Shotgun, ScatterShot, HyperSpeed, Invisibility,
Bomb, MissileBarage, MegaBomb, ShieldRecharge, ForceShield } from './models/special';

export class SPECIAL {
  public static TYPE = {
    "Weapon Charge": {
      'systemType': WeaponCharge,
      'description': `Increate the damage, radius and explosive radius of your next attack.`,
      'amount': 2,
      'fireRate': 3000
    },
    "Shotgun": {
      'systemType': Shotgun,
      'description': `Fires a blast of short range molten slugs in front of your ship.`,
      'fireRate': 5000,
      'unlockKey': "maxKills_Weapon Charge",
      'unlockCount': 200
    },
    "Bomb": {
      'systemType': Bomb,
      'description': `Fires a slow moving bomb in front of your ship that explodes on impact.`,
      'fireRate': 5000,
      'unlockKey': "maxKills_Shotgun",
      'unlockCount': 200
    },
    "Mega Bomb": {
      'systemType': MegaBomb,
      'description': `Fires a slow moving bomb in front of your ship, has a large explosion on impact.`,
      'fireRate': 10000,
      'unlockKey': "maxKills_Bomb",
      'unlockCount': 200
    },
    "Scatter Shot": {
      'systemType': ScatterShot,
      'description': `Fires a blast of short range molten slugs around your ship.`,
      'fireRate': 15000,
      'unlockKey': "maxKills_Mega Bomb",
      'unlockCount': 200
    },
    "Missile Barrage": {
      'systemType': MissileBarage,
      'description': `Fires a mass off tracking missiles from the front of your ship.`,
      'fireRate': 5000,
      'unlockKey': "maxKills_Scatter Shot",
      'unlockCount': 200
    },
    "Emergency Brake": {
      'systemType': EmergencyBrake,
      'description': `Immediately stop your ships movement, transfering that energy in the form of a blast wave from the ship.`,
      'fireRate': 2000
    },
    "Shield Recharge": {
      'systemType': ShieldRecharge,
      'description': `Immediately recharge your shields. When used at full charge causes an explosion around your ship.`,
      'amount': 1,
      'fireRate': 15000,
      'unlockKey': "maxKills_Emergency Brake",
      'unlockCount': 200
    },
    "Ramming Shield": {
      'systemType': RammingShield,
      'description': `Protect your ship from collision damage allowing you to ram enemies.`,
      'duration': 4000,
      'fireRate': 10000,
      'unlockKey': "maxKills_Shield Recharge",
      'unlockCount': 200
    },
    "Force Shield": {
      'systemType': ForceShield,
      'description': `Protect your ship from all forms of damage.`,
      'duration': 3000,
      'fireRate': 15000,
      'unlockKey': "maxKills_Ramming Shield",
      'unlockCount': 200
    },
    "Thrusters": {
      'systemType': Thrusters,
      'description': `Doubles your speed and accelleration causing damage to all enemies in your wake.`,
      'amount': 2,
      'duration': 2000,
      'fireRate': 4000
    },
    "Hyper Speed": {
      'systemType': HyperSpeed,
      'description': `Create a wormhole and travel a short distance thought spacetime damaging all enemies in your path.`,
      'amount': 1,
      'fireRate': 5000,
      'unlockKey': "maxKills_Thrusters",
      'unlockCount': 200
    },
    "Invisibility": {
      'systemType': Invisibility,
      'description': `Turn invisible and untargettable by enemies and missile. Become invulnerable for a brief moment when activated and creating an explosion when reappearing.`,
      'duration': 5000,
      'fireRate': 12000,
      'unlockKey': "maxKills_Hyper Speed",
      'unlockCount': 200
    },
  };
}
