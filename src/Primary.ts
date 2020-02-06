import { Cannon, Blaster, Torpedo, Missile, Beam, Primary} from './models/primary';
import { Entity } from './models/Entity';

export class PRIMARY {

  static getSystem(type:string, entity:Entity):Primary {
    let system_type = PRIMARY.TYPE[type]["system_type"];
    return new system_type( entity, PRIMARY.TYPE[type]);
  }

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
      damage: 0.15,
      range: 0.8,
      speed: 400,
      fire_rate: 0.2,
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
      range: 1.5,
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
      blast_radius: 250
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
      range: 1.5,
      speed: 350,
      fire_rate: 0.9,
      radius: 15,
      bullet_count: 2,
      bullet_angle: Math.PI/6,
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
      blast_radius: 250
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
      range: 1.5,
      speed: 350,
      fire_rate: 0.9,
      radius: 15,
      bullet_count: 3,
      bullet_angle: Math.PI/4,
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
      blast_radius: 250
    },
  };
}
