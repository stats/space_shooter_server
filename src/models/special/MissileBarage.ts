import { SpecialSystem } from './SpecialSystem';
import { Bullet } from '../Bullet';
import { MissilePath } from '../../behaviours/Bullet/MissilePath';
import { C, CT } from '../../Constants';

export class MissileBarage extends SpecialSystem {

  handleEvent(): void {
    for(let i = 0; i < 6; i++) {
      const spawnLocation = this.target.getBulletSpawnLocation();
      const bullet: Bullet = new Bullet({
        damage: this.target.getDamage() / 3,
        speed: 350,
        range: 600,
        collisionType: CT.CIRCLE,
        radius: 15,
        bulletMesh: "Missile",
        x: spawnLocation.x - 45 + (i * 15),
        y: spawnLocation.y,
        bulletType: C.SHIP_BULLET
      });

      bullet.registerBehaviour("path", new MissilePath(bullet, {angle: (i * Math.PI/6)}));
      bullet.firedBy = this.target;
      this.target.$state.addBullet(bullet);
    }
  }

}
