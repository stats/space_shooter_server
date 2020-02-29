import { Behaviour } from '../behaviour';
import { Primary } from '../../models/primary/Primary';
import { Enemy } from '../../models/Enemy';

export class DropsBulletBehaviour extends Behaviour {

  timer = 0;
  cooldown = 0;
  system: Primary;

  target: Enemy;

  constructor(target: Enemy, args: { bulletOptions: any }) {
    super('drops_bullet', target);
    this.system = new args.bulletOptions.system(this.target, args.bulletOptions);
    this.cooldown = args.bulletOptions.cooldown;
  }

  onUpdate(deltaTime): void {
    this.timer += deltaTime;
    if(this.timer >= this.cooldown) {
      this.system.spawnBullets(this.target);
      this.timer = 0;
    }
  }
}
