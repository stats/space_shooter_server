import { SpecialSystem } from './SpecialSystem';
import { Bullet } from '../Bullet';
import { StraightLineUpPath } from '../../behaviours/Bullet/StraightLineUpPath';
import { ExplodeBehaviour } from '../../behaviours/Bullet/ExplodeBehaviour';
import { C, CT } from '../../Constants';

export class MegaBomb extends SpecialSystem {

  handleEvent() {
    let spawn_location = this.target.getBulletSpawnLocation();
    let bullet:Bullet = new Bullet({
      damage: this.target.getDamage() / 3,
      speed: 250,
      range: 500,
      collision_type: CT.CIRCLE,
      radius: 25,
      bullet_mesh: "MegaBomb",
      x: spawn_location.x,
      y: spawn_location.y,
      bullet_type: C.SHIP_BULLET,
      explodes: true,
      blast_radius: 400
    });
    bullet.registerBehaviour(new StraightLineUpPath(bullet));
    bullet.registerBehaviour(new ExplodeBehaviour(bullet));
    bullet.fired_by = this.target;
    this.target.$state.addBullet(bullet);
  }

}
