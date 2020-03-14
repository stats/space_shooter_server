import { Behaviour, Primary, Enemy } from '../../Internal';

export class FiresBulletBehaviour extends Behaviour {

  timer = 0;
  cooldown = 0;
  system: Primary;

  target: Enemy;

  constructor(target: Enemy, bulletOptions ) {
    super('fires_bullet', target);
    this.system = new bulletOptions.system(this.target, bulletOptions);
    this.cooldown = bulletOptions.cooldown;
  }

  onUpdate(deltaTime): void {
    this.timer += deltaTime;
    if(this.timer >= this.cooldown) {
      this.system.spawnBullets(this.target);
      this.timer = 0;
    }
  }
}
