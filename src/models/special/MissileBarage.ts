import { SpecialSystem } from './SpecialSystem';
import { Bullet } from '../bullet';
import { MissilePath } from '../../behaviours/bullet/MissilePath';
import { C, CT } from '../../constants';

export class MissileBarage extends SpecialSystem {

  handleEvent() {
    for(let i = 0; i < 6; i++) {
      let spawn_location = this.target.getBulletSpawnLocation();
      let bullet:Bullet = new Bullet({
        damage: this.target.getDamage() / 3,
        speed: 350,
        range: 600,
        collision_type: CT.CIRCLE,
        radius: 15,
        bullet_mesh: 3,
        x: spawn_location.x - 45 + (i * 15),
        y: spawn_location.y,
        bullet_type: C.SHIP_BULLET
      });

      bullet.registerBehaviour(new MissilePath(bullet, {angle: (i * Math.PI/6)}));
      bullet.fired_by = this.target;
      this.target.$state.addBullet(bullet);
    }
  }

}
