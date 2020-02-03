import { Ship } from '../ship';
import { C, CT } from '../../constants';
import { StraightAnglePath} from '../../behaviours/bullet/StraightAnglePath';
import { Bullet } from '../bullet';

export class Shotgun {

  private target:Ship;

  constructor(target:Ship) {
    this.target = target;
  }

  handleEvent() {
    for(let i = 0; i < 5; i++) {
      let spawn_location = this.target.getBulletSpawnLocation();
      let bullet:Bullet = new Bullet({
        damage: this.target.getDamage() / 3,
        speed: 500,
        range: 250,
        collision_type: CT.CIRCLE,
        radius: 15,
        bullet_mesh: 0,
        x: spawn_location.x,
        y: spawn_location.y,
        bullet_type: C.SHIP_BULLET
      });
      bullet.registerBehaviour(new StraightAnglePath(bullet, {angle: ((i * 10) + 70) * (Math.PI/180)}));
      bullet.fired_by = this.target;
      this.target.$state.addBullet(bullet);
    }
  }
}
