import { SpecialSystem } from './SpecialSystem';
import { Bullet } from '../Bullet';
import { StraightLineUpPath } from '../../behaviours/Bullet/StraightLineUpPath';
import { ExplodeBehaviour } from '../../behaviours/Bullet/ExplodeBehaviour';
import { C, CT } from '../../Constants';

export class MegaBomb extends SpecialSystem {

  handleEvent() {
    const spawnLocation = this.target.getBulletSpawnLocation();
    const bullet: Bullet = new Bullet({
      damage: this.target.getDamage() / 3,
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
    bullet.registerBehaviour(new StraightLineUpPath(bullet));
    bullet.registerBehaviour(new ExplodeBehaviour(bullet));
    bullet.firedBy = this.target;
    this.target.$state.addBullet(bullet);
  }

}
