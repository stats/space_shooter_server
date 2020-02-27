import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { PRIMARY } from '../../Primary';
import { Primary } from '../../models/primary/Primary';

export class FiresBulletBehaviour extends Behaviour {

  timer:number = 0;
  cooldown:number = 0;
  system:Primary;

  constructor(target:any, args: {bullet_options:any}) {
    super('fires_bullet', target);
    this.system = new args.bullet_options.system(this.target, args.bullet_options);
    this.cooldown = args.bullet_options.cooldown;
  }

  onUpdate(deltaTime) {
    this.timer += deltaTime;
    if(this.timer >= this.cooldown) {
      this.system.spawnBullets(this.target);
      this.timer = 0;
    }
  }
}
