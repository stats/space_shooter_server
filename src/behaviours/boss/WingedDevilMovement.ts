import { Behaviour } from '../behaviour';
import { WingedDevil, WingedDevilState } from '../../models/bosses/WingedDevil';
import { StraightAnglePath } from '../bullet/StraightAnglePath';
import { StraightLineDownPath } from '../bullet/StraightLineDownPath';
import { Bullet, Position } from '../../models';
import { C, CT } from '../../Constants';

export class WingedDevilMovement extends Behaviour {

  target: WingedDevil;

  private nextState: WingedDevilState;

  private targetPosition: Position;

  private passiveAttackCooldown = 3000;
  private passiveAttackTimer = 0;

  private attackCooldown = 1000;
  private attackTimer = 0;

  private waitCooldown = 0;
  private waitTimer = 0;

  private moveDirection = 1;
  private rotationDirection = 1;

  constructor(target: WingedDevil) {
    super('wingedDevilMovement', target);

    if(this.targetPosition == null) {
      this.targetPosition = new Position(800, 800);
    }

    const dx = this.targetPosition.x - this.target.position.x;
    const dy = this.targetPosition.y - this.target.position.y;

    this.target.angle = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime: number): void {
    switch(this.target.state) {
      case WingedDevilState.ENTER_SCREEN:
        this.enterScreen(deltaTime);
      break;
      case WingedDevilState.ATTACK:
        this.attack(deltaTime);
      break;
      case WingedDevilState.MOVE:
        this.move(deltaTime);
        this.passive(deltaTime);
      break;
    }
  }

  private passive(deltaTime: number ) {
    if(this.passiveAttackTimer >= this.passiveAttackCooldown) {
      this.firePassive();
      this.passiveAttackTimer = 0;
    } else {
      this.passiveAttackTimer += deltaTime;
    }
  }

  private wait(deltaTime: number): void {
    if(this.waitTimer >= this.waitCooldown) {
      this.target.state = this.nextState;
      this.waitTimer = 0;
    } else {
      this.waitTimer += deltaTime;
    }
  }

  private enterScreen(deltaTime: number): void {
    this.target.bulletInvulnerable = true;
    this.target.collisionInvulnerable = true;

    if(this.target.position.distanceTo(this.targetPosition) <= this.target.speed * deltaTime/1000) {
      this.target.position.x = this.targetPosition.x;
      this.target.position.y = this.targetPosition.y;
      this.target.state = WingedDevilState.MOVE;
    } else {
      this.target.position.x += Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
      this.target.position.y += Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;
    }
  }

  private attack(deltaTime: number): void {
    this.target.bulletInvulnerable = false;
    this.target.collisionInvulnerable = false;

    // Facing down = (3 * Math.PI) / 2 -> 4.71
    // Facing right = 0
    // Facing left = Math.PI -> 3.14
    if(this.moveDirection == -1) { //The ship is now on the right hand side of the screen
      this.target.angle += this.rotationDirection * 0.5 * deltaTime/1000;
      if(this.target.angle >= 2 * Math.PI && this.rotationDirection == 1 ) {
        this.rotationDirection = -1;
      } else if(this.target.angle <= (3 * Math.PI / 2) && this.rotationDirection == -1) {
        this.target.angle = (3 * Math.PI / 2);
        this.target.state = WingedDevilState.MOVE;
      }
    } else if ( this.moveDirection == 1 ) { //The ship is now on the right hand side of the screen
      this.target.angle += this.rotationDirection * 0.5 * deltaTime / 1000;
      if(this.target.angle <= 0 && this.rotationDirection == -1 ) {
        this.rotationDirection = 1;
      } else if(this.target.angle >= (3 * Math.PI / 2) && this.rotationDirection == 1) {
        this.target.angle = (3 * Math.PI / 2);
        this.target.state = WingedDevilState.MOVE;
      }
    }

    if(this.attackTimer >= this.attackCooldown) {
      this.activeAttack();
      this.attackTimer = 0;
    } else {
      this.attackTimer += deltaTime;
    }
  }

  private move(deltaTime: number): void {
    this.target.bulletInvulnerable = false;
    this.target.collisionInvulnerable = false;

    this.target.position.x += this.moveDirection * this.target.speed * deltaTime / 1000;

    if(this.target.position.x >= 1400) {
      this.moveDirection = -1;
      this.target.state = WingedDevilState.ATTACK;
    }
    if( this.target.position.x <= 200) {
      this.moveDirection = 1;
      this.target.state = WingedDevilState.ATTACK;
    }
  }

  private firePassive() {
    const options = {
      damage: this.target.damage,
      speed: this.target.speed * 5,
      range: this.target.range,
      collisionType: CT.CIRCLE,
      radius: 15,
      bulletMesh: "EnemyBeam",
      position: this.target.position.clone(),
      bulletType: C.ENEMY_BULLET
    }

    let bullet: Bullet;

    bullet = new Bullet(options);
    bullet.position = this.rotateOffset(-10, 10);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position =
    bullet.position = this.rotateOffset(-10, 20);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = this.rotateOffset(-10, -10);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = this.rotateOffset(-10, -20);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);
  }

  private rotateOffset(x, y): Position {

    let ox = this.target.position.x;
    let oy = this.target.position.y;

    let qx = ox + Math.cos(this.target.angle) * (x - ox) + Math.sin(this.target.angle) * ( y - oy);
    let qy = oy + -Math.sin(this.target.angle) * ( x - ox) + Math.cos(this.target.angle) * ( y - oy);

    return new Position(qx, qy);
  }

  private activeAttack() {
    const options = {
      damage: this.target.damage,
      speed: this.target.speed * 5,
      range: this.target.range,
      collisionType: CT.CIRCLE,
      radius: 15,
      bulletMesh: "Enemy2",
      position: this.target.position.clone(),
      bulletType: C.ENEMY_BULLET
    }

    let bullet: Bullet;

    bullet = new Bullet(options);
    bullet.position = this.rotateOffset(-100, 50);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position =
    bullet.position = this.rotateOffset(-90, 60);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = this.rotateOffset(-80, 70);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = this.rotateOffset(-100, -50);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position =
    bullet.position = this.rotateOffset(-90, -60);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = this.rotateOffset(-80, -70);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: this.target.angle}));
    this.target.$state.addBullet(bullet);
  }
}
