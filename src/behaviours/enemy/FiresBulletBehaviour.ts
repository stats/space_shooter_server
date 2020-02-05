import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class FiresBulletBehaviour extends Behaviour {

  timer:number = 0;
  options:any;
  system:any;

  constructor(target:any, args: {system:any, bullet_options:any}) {
    super('fires_bullet', target);
    this.options = args.bullet_options;
    this.system = new args.system();
  }

  onUpdate(deltaTime) {
    this.timer += deltaTime;
    if(this.timer >= this.options.cooldown) {
      this.fireBullet();
      this.timer = 0;
    }
  }

  fireBullet() {

  }
}
