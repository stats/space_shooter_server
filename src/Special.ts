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
    "Shotgun": {
      system_type: Shotgun,
      fire_rate: 5000,
      unlock_key: "max_kills_Weapon Charge",
      unlock_count: 200
    },
    "Bomb": {
      system_type: Bomb,
      fire_rate: 5000,
      unlock_key: "max_kills_Shotgun",
      unlock_count: 200
    },
    "Mega Bomb": {
      system_type: MegaBomb,
      fire_rate: 10000,
      unlock_key: "max_kills_Bomb",
      unlock_count: 200
    },
    "Scatter Shot": {
      system_type: ScatterShot,
      fire_rate: 15000,
      unlock_key: "max_kills_Mega Bomb",
      unlock_count: 200
    },
    "Missile Barrage": {
      system_type: MissileBarage,
      fire_rate: 5000,
      unlock_key: "max_kills_Scatter Shot",
      unlock_count: 200
    },
    "Emergency Brake": {
      system_type: EmergencyBrake,
      fire_rate: 2000
    },
    "Shield Recharge": {
      system_type: ShieldRecharge,
      amount: 1,
      fire_rate: 15000,
      unlock_key: "max_kills_Emergency Brake",
      unlock_count: 200
    },
    "Ramming Shield": {
      system_type: RammingShield,
      duration: 4000,
      fire_rate: 10000,
      unlock_key: "max_kills_Shield Recharge",
      unlock_count: 200
    },
    "Force Shield": {
      system_type: ForceShield,
      duration: 3000,
      fire_rate: 15000,
      unlock_key: "max_kills_Ramming Shield",
      unlock_count: 200
    },
    "Thrusters": {
      system_type: Thrusters,
      amount: 2,
      duration: 2000,
      fire_rate: 4000
    },
    "Hyper Speed": {
      system_type: HyperSpeed,
      amount: 1,
      fire_rate: 5000,
      unlock_key: "max_kills_Thrusters",
      unlock_count: 200
    },
    "Invisibility": {
      system_type: Invisibility,
      duration: 5000,
      fire_rate: 12000,
      unlock_key: "max_kills_Hyper Speed",
      unlock_count: 200
    },
  };
}
