import {ScatterShot } from './models/special/scatter_shot';
import {EmergencyBrake } from './models/special/emergency_brake';
import { Shotgun } from './models/special/shotgun';

export class SPECIAL {
  public static TYPE = {
    "Weapon Charge": {
      system_type: WeaponCharge,
      fire_rate: 3000
    }
    "Emergency Brake": {
      system_type: EmergencyBrake,
      fire_rate: 2000
    },
    "Thrusters": {
      system_type: Thrusters,
      fire_rate: 2000
    },
    "Ramming Shield": {
      system_type: RammingShield,
      fire_rate: 10000
    },
    "Shotgun": {
      system_type: Shotgun,
      fire_rate: 5000
    },
    "Scatter Shot": {
      system_type: ScatterShot,
      fire_rate: 15000
    },
    "Hyper Speed": {
      system_type: HyperSpeed,
      fire_rate: 5000
    },
    "Invisibility": {
      system_type: Invisibility,
      fire_rate: 10000
    },
    "Bomb": {
      system_type: Bomb,
      fire_rate: 5000
    },
    "Missile Barrage": {
      system_type: MissileBarage,
      fire_rate: 15000
    },
    "Mega Bomb": {
      system_type: MegaBomb,
      fire_rate: 10000
    },
    "ShieldCharge": {
      system_type: ShieldCharge,
      fire_rate: 15000
    },
    "Force Shield": {
      system_type: ForceShield,
      fire_rate: 15000
    }
  };
}
