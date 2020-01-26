import {ScatterShot } from './models/special/scatter_shot';
import {EmergencyBrake } from './models/special/emergency_brake';
import { Shotgun } from './models/special/shotgun';

export class SPECIAL {
  public static TYPE = {
    "Emergency Brake": {
      system_type: EmergencyBrake,
      fire_rate: 2000
    },
    "Shotgun": {
      system_type: Shotgun,
      fire_rate: 3000
    },
    "Scatter Shot": {
      system_type: ScatterShot,
      fire_rate: 5000
    }
  };
}
