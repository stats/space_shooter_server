import { Cannon } from './models/primary/cannon';
import { Blaster } from './models/primary/blaster';
import { Torpedo } from './models/primary/torpedo';
import { Missile } from './models/primary/missile';
import { Beam } from './models/primary/beam';

export class PRIMARY {
  public static TYPE = {
    "Cannon": {
      system_type: Cannon,
      damage: 1,
      range: 1,
      speed: 400,
      fire_rate: 1,
      radius: 15,
      bullet_count: 1,
      bullet_angle: 0,
      bullet_offset: 0
    },
    "Blaster": {
      system_type: Blaster,
      damage: 1.2,
      range: 1.2,
      speed: 350,
      fire_rate: 0.8,
      radius: 15,
      bullet_count: 1,
      bullet_angle: 0,
      bullet_offset: 0
    },
    "Rapid": {
      system_type: Cannon,
      damage: 0.5,
      range: 0.8,
      speed: 400,
      fire_rate: 0.5,
      radius: 15,
      bullet_count: 1,
      bullet_angle: 0,
      bullet_offset: 0
    },
    "Cannon 2.0": {
      system_type: Cannon,
      damage: 1,
      range: 1,
      speed: 400,
      fire_rate: 1,
      radius: 15,
      bullet_count: 2,
      bullet_angle: Math.PI/6,
      bullet_offset: 0
    },
    "Beam": {
      system_type: Beam,
      damage: 1,
      range: 1.1,
      speed: 600,
      fire_rate: 1.1,
      radius: 15,
      bullet_count: 1,
      bullet_angle: 0,
      bullet_offset: 0
    },
    "Blaster 2.0": {
      system_type: Blaster,
      damage: 1.2,
      range: 1.2,
      speed: 350,
      fire_rate: 0.8,
      radius: 15,
      bullet_count: 2,
      bullet_angle: 0,
      bullet_offset: 30
    },
    "Missile": {
      system_type: Missile,
      damage: 1.2,
      range: 1,
      speed: 350,
      fire_rate: 0.9,
      radius: 15,
      bullet_count: 1,
      bullet_angle: 0,
      bullet_offset: 0
    },
    "Torpedo": {
      system_type: Torpedo,
      damage: 1.3,
      range: 1.2,
      speed: 400,
      fire_rate: 0.8,
      radius: 15,
      bullet_count: 1,
      bullet_angle: 0,
      bullet_offset: 0,
      blast_radius: 30
    },
    "Double Beam": {
      system_type: Beam,
      damage: 1,
      range: 1.1,
      speed: 600,
      fire_rate: 1,
      radius: 15,
      bullet_count: 2,
      bullet_angle: 0,
      bullet_offset: 15
    },
    "Cannon 3.0": {
      system_type: Cannon,
      damage: 1,
      range: 1,
      speed: 400,
      fire_rate: 1,
      radius: 15,
      bullet_count: 3,
      bullet_angle: Math.PI/4,
      bullet_offset: 0
    },
    "Double Missile": {
      system_type: Missile,
      damage: 1.2,
      range: 1,
      speed: 350,
      fire_rate: 0.9,
      radius: 15,
      bullet_count: 2,
      bullet_angle: 0,
      bullet_offset: 15
    },
    "Blaster 3.0": {
      system_type: Blaster,
      damage: 1.2,
      range: 1.2,
      speed: 350,
      fire_rate: 0.8,
      radius: 15,
      bullet_count: 3,
      bullet_angle: 0,
      bullet_offset: 30
    },
    "Double Torpedo": {
      system_type: Torpedo,
      damage: 1.3,
      range: 1.2,
      speed: 400,
      fire_rate: 0.8,
      radius: 15,
      bullet_count: 2,
      bullet_angle: 0,
      bullet_offset: 15,
      blast_radius: 30
    },
    "Triple Beam": {
      system_type: Beam,
      damage: 1,
      range: 1.1,
      speed: 600,
      fire_rate: 1,
      radius: 15,
      bullet_count: 3,
      bullet_angle: 0,
      bullet_offset: 15
    },
    "Triple Missile": {
      system_type: Missile,
      damage: 1.2,
      range: 1,
      speed: 350,
      fire_rate: 0.9,
      radius: 15,
      bullet_count: 3,
      bullet_angle: 0,
      bullet_offset: 15
    },
    "Triple Torpedo": {
      system_type: Torpedo,
      damage: 1.3,
      range: 1.2,
      speed: 400,
      fire_rate: 0.8,
      radius: 15,
      bullet_count: 3,
      bullet_angle: 0,
      bullet_offset: 15,
      blast_radius: 30
    },
  };
}
