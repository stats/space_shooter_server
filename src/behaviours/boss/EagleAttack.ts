import { Behaviour, Eagle, C, CT, StraightLineDownPath, StraightAnglePath, Position, Bullet } from '../../Internal';


export class EagleAttack extends Behaviour {

  target: Eagle;

  constructor(target: Eagle) {
    super('eagleAttack', target);
  }

  onEvent(args?: {attackPhase?: boolean}) {

    const bullets: Bullet[] = [];

    const options = {
      damage: this.target.damage,
      speed: this.target.speed * 5,
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
      bullet.position = new Position(this.target.position.x, this.target.position.y - 30);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x - 100, this.target.position.y - 30);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x + 100, this.target.position.y - 30);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x - 200, this.target.position.y - 30);
      bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: -Math.PI/2 - Math.PI/8}));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x + 200, this.target.position.y - 30);
      bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: -Math.PI/2 + Math.PI/8}));
      this.target.$state.addBullet(bullet);
    } else {
      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x, this.target.position.y - 30);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x - 200, this.target.position.y - 30);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);

      bullet = new Bullet(options);
      bullet.position = new Position(this.target.position.x + 200, this.target.position.y - 30);
      bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
      this.target.$state.addBullet(bullet);
    }
  }

}
