import { SpecialSystem } from './SpecialSystem';
import { Bullet } from '../bullet';
import { StraightLineUpPath } from '../../behaviours/bullet/StraightLineUpPath';
import { ExplodeBehaviour } from '../../behaviours/bullet/ExplodeBehaviour';
import { C, CT } from '../../constants';

export class MegaBomb extends SpecialSystem {

  handleEvent() {
    let spawn_location = this.target.getBulletSpawnLocation();
    let bullet:Bullet = new Bullet({
      damage: this.target.getDamage() / 3,
      speed: 300,
      range: 500,
      collision_type: CT.CIRCLE,
      radius: 25,
      bullet_mesh: 6,
      x: spawn_location.x,
      y: spawn_location.y,
      bullet_type: C.SHIP_BULLET,
      explodes: true
    });
    bullet.registerBehaviour(new StraightLineUpPath(bullet));
    bullet.registerBehaviour(new ExplodeBehaviour(bullet, {blast_radius: 200}));
    bullet.fired_by = this.target;
    this.target.$state.addBullet(bullet);
  }

}
