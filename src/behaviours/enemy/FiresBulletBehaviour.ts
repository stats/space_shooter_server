import { Behaviour } from '../behaviour';
import { C } from '../../constants';

export class FiresBulletBehaviour extends Behaviour {

  timer:number = 0;
  system:Primary;

  constructor(target:any, args: {bullet_options:any}) {
    super('fires_bullet', target);
    this.system = Primary.getSystem(args.bullet_options.system, this.target, args.bullet_options);
  }

  fire() {
    let bullets = this.system.getBullets();
    for(var i = 0; i < this.bullets.length; i++) {
      
    }
  }

  onUpdate(deltaTime) {
    this.timer += deltaTime;
    if(this.timer >= this.options.cooldown) {
      this.fire();
      this.timer = 0;
    }
  }
}
