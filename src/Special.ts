import { WeaponCharge, EmergencyBrake, Thrusters,
RammingShield, Shotgun, ScatterShot, HyperSpeed, Invisibility,
Bomb, MissileBarage, MegaBomb, ShieldRecharge, ForceShield } from './models/special';

export class SPECIAL {
  public static TYPE = {
    "Weapon Charge": {
      system_type: WeaponCharge,
      amount: 2,
      fire_rate: 3000
    },
    "Emergency Brake": {
      system_type: EmergencyBrake,
      fire_rate: 2000
    },
    "Thrusters": {
      system_type: Thrusters,
      amount: 2,
      duration: 2000,
      fire_rate: 4000
    },
    "Ramming Shield": {
      system_type: RammingShield,
      duration: 1000,
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
      amount: 1,
      fire_rate: 5000
    },
    "Invisibility": {
      system_type: Invisibility,
      duration: 2000,
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
    "Shield Recharge": {
      system_type: ShieldRecharge,
      amount: 1,
      fire_rate: 15000
    },
    "Force Shield": {
      system_type: ForceShield,
      duration: 2000,
      fire_rate: 15000
    }
  };
}
