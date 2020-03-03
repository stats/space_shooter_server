import { Behaviour } from '../behaviour';
import { Eagle } from '../../models/bosses/Eagle';
import { C, CT } from '../../Constants';
import { StraightLineDownPath } from '../bullet/StraightLineDownPath';
import { Position } from '../../models/Position';
import { Bullet } from '../../models/Bullet';

export class EagleAttack extends Behaviour {

  target: Eagle;

  constructor(target: Eagle) {
    super('eagleAttack', target);
  }

  onEvent(args?: {attackPhase?: boolean}) {

    const bullets: Bullet[] = [];

    const options = {
      damage: this.target.damage,
      speed: this.target.speed,
      range: this.target.range,
      collisionType: CT.CIRCLE,
      radius: 15,
      bulletMesh: "Enemy1",
      position: this.target.position.clone(),
      bulletType: C.ENEMY_BULLET
    }

    let bullet;

    if(args && args.attackPhase) {
      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x, this.target.position.y - 50);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x - 200, this.target.position.y - 50);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x + 200, this.target.position.y - 50);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x - 400, this.target.position.y - 50);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x + 400, this.target.position.y - 50);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);
    } else {
      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x, this.target.position.y - 50);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x - 200, this.target.position.y - 50);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x + 200, this.target.position.y - 50);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);
    }
  }

}
