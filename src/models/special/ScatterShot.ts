/* Fires a spread of bullets from the ship */
import { SpecialSystem, C, CT, BulletStraightAnglePath, Bullet } from '../../Internal';

export class ScatterShot extends SpecialSystem {

  handleEvent(): void {
    for(let i = 0; i < 18; i++) {
      const spawnLocation = this.target.getBulletSpawnLocation();
      const bullet: Bullet = new Bullet({
        damage: ( ( this.target.getDamage() + this.target.tempSpecialDamage ) / 5 ) * this.target.tempSpecialDamagePercent,
        speed: 500,
        range: 250,
        collisionType: CT.CIRCLE,
        radius: 15,
        bulletMesh: "Cannon",
        x: spawnLocation.x,
        y: spawnLocation.y,
        bulletType: C.SHIP_BULLET
      });
      bullet.registerBehaviour("path", new BulletStraightAnglePath(bullet, {angle: i * 20 * (Math.PI/180)}));
      bullet.firedBy = this.target;
      this.target.$state.addBullet(bullet);
    }
  }
}
