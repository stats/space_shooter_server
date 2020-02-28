import { SpecialSystem } from './SpecialSystem';
import { C, CT } from '../../Constants';
import { StraightAnglePath} from '../../behaviours/Bullet/StraightAnglePath';
import { Bullet } from '../Bullet';

export class Shotgun extends SpecialSystem {

  handleEvent() {
    for(let i = 0; i < 5; i++) {
      const spawnLocation = this.target.getBulletSpawnLocation();
      const bullet: Bullet = new Bullet({
        damage: this.target.getDamage() / 3,
        speed: 500,
        range: 250,
        collisionType: CT.CIRCLE,
        radius: 15,
        bulletMesh: "Cannon",
        x: spawnLocation.x,
        y: spawnLocation.y,
        bulletType: C.SHIP_BULLET
      });
      bullet.registerBehaviour(new StraightAnglePath(bullet, {angle: ((i * 10) + 70) * (Math.PI/180)}));
      bullet.firedBy = this.target;
      this.target.$state.addBullet(bullet);
    }
  }

}
