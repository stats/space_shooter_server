import { Behaviour } from '../behaviour';
import { C } from '../../Constants';
import { PRIMARY } from '../../Primary';
import { Primary } from '../../models/primary/Primary';

export class DropsBulletBehaviour extends Behaviour {

  timer = 0;
  cooldown = 0;
  system: Primary;

  constructor(target: any, args: {bulletOptions: any}) {
    super('drops_bullet', target);
    this.system = new args.bulletOptions.system(this.target, args.bulletOptions);
    this.cooldown = args.bulletOptions.cooldown;
  }

  onUpdate(deltaTime) {
    this.timer += deltaTime;
    if(this.timer >= this.cooldown) {
      this.system.spawnBullets(this.target);
      this.timer = 0;
    }
  }
}
