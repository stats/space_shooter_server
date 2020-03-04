/* Fires a spread of bullets from the ship */
import { SpecialSystem } from './SpecialSystem';
import { C, CT } from '../../Constants';
import { StraightAnglePath} from '../../behaviours/bullet/StraightAnglePath';
import { Bullet } from '../Bullet';

export class ScatterShot extends SpecialSystem {

  handleEvent(): void {
    for(let i = 0; i < 18; i++) {
      const spawnLocation = this.target.getBulletSpawnLocation();
      const bullet: Bullet = new Bullet({
        damage: this.target.getDamage() / 5,
        speed: 500,
        range: 250,
        collisionType: CT.CIRCLE,
        radius: 15,
        bulletMesh: "Cannon",
        x: spawnLocation.x,
        y: spawnLocation.y,
        bulletType: C.SHIP_BULLET
      });
      bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: i * 20 * (Math.PI/180)}));
      bullet.firedBy = this.target;
      this.target.$state.addBullet(bullet);
    }
  }
}
