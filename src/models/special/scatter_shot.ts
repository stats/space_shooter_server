/* Fires a spread of bullets from the ship */
import { Ship } from '../ship';
import { C, CT } from '../../constants';
import { StraightAnglePath} from '../../behaviours/bullet/StraightAnglePath';
import { Bullet } from '../bullet';

export class ScatterShot {

  private target:Ship;

  constructor(target:Ship) {
    this.target = target;
  }

  handleEvent() {
    for(let i = 0; i < 18; i++) {
      let spawn_location = this.target.getBulletSpawnLocation();
      let bullet:Bullet = new Bullet({
        damage: this.target.getDamage() / 5,
        speed: 500,
        range: 250,
        collision_type: CT.CIRCLE,
        radius: 15,
        bullet_mesh: 0,
        x: spawn_location.x,
        y: spawn_location.y,
        angle: i * 20 * (Math.PI/180),
        behaviours: [StraightAnglePath],
        bullet_type: C.SHIP_BULLET
      });
      bullet.fired_by = this.target;
      this.target.$state.addBullet(bullet);
    }
  }
}
