import { Blaster } from './blaster';

export class Beam extends Blaster {

  constructor(entity, options) {
    super(entity, options);
    this.bullet_mesh = "Beam";
  }

}
