import { SpecialSystem, Bullet, BulletStraightAnglePath, ExplodeBehaviour, C, CT } from '../../Internal';

export class Bomb extends SpecialSystem {

  handleEvent(): void {
    const spawnLocation = this.target.getBulletSpawnLocation();
    const bullet: Bullet = new Bullet({
      damage: ( ( this.target.getDamage() + this.target.tempSpecialDamage ) / 3 ) * this.target.tempSpecialDamagePercent,
      speed: 250,
      range: 500,
      collisionType: CT.CIRCLE,
      radius: 20,
      x: spawnLocation.x,
      y: spawnLocation.y,
      bulletType: C.SHIP_BULLET,
      bulletMesh: "Bomb",
      blastRadius: 300,
      explodes: true
    });
    bullet.registerBehaviour("path", new BulletStraightLineUpPath(bullet));
    bullet.registerBehaviour("explode", new ExplodeBehaviour(bullet));
    bullet.firedBy = this.target;
    this.target.$state.addBullet(bullet);
  }

}
