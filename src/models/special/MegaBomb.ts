import { SpecialSystem } from './SpecialSystem';
import { Bullet } from '../Bullet';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';
import { ExplodeBehaviour } from '../../behaviours/bullet/ExplodeBehaviour';
import { C, CT } from '../../Constants';

export class MegaBomb extends SpecialSystem {

  handleEvent(): void {
    const spawnLocation = this.target.getBulletSpawnLocation();
    const bullet: Bullet = new Bullet({
      damage: ( ( this.target.getDamage() + this.target.tempSpecialDamage ) / 3 ) * this.target.tempSpecialDamagePercent,
      speed: 250,
      range: 500,
      collisionType: CT.CIRCLE,
      radius: 25,
      bulletMesh: "MegaBomb",
      x: spawnLocation.x,
      y: spawnLocation.y,
      bulletType: C.SHIP_BULLET,
      explodes: true,
      blastRadius: 400
    });
    bullet.registerBehaviour("path", new StraightLineUpPath(bullet));
    bullet.registerBehaviour("explode", new ExplodeBehaviour(bullet));
    bullet.firedBy = this.target;
    this.target.$state.addBullet(bullet);
  }

}
