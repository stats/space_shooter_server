import { Behaviour } from '../behaviour';
import { Eagle, EagleState } from '../../models/bosses/Eagle';
import { StraightAnglePath } from '../bullet/StraightAnglePath';
import { StraightLineDownPath } from '../bullet/StraightLineDownPath';
import { Bullet, Position } from '../../models';
import { Tank } from '../../models/enemies/Tank';
import { C, CT } from '../../Constants';

export class EagleMovement extends Behaviour {

  target: Eagle;

  private nextState: EagleState;

  private targetPosition: Position;

  private passiveAttackCooldown = 4000;
  private passiveAttackTimer = 0;

  private attackCooldown = 500;
  private attackTimer = 0;

  private attackPhaseCooldown = 6000;
  private attackPhaseTimer = 0;

  private waitCooldown = 0;
  private waitTimer = 0;

  private moveDirection = 1;
  private moveCooldown = 500;
  private moveTimer = 0;

  constructor(target: Eagle) {
    super('eagleMovement', target);

    if(this.targetPosition == null) {
      this.targetPosition = new Position(800, 800);
    }

    const dx = this.targetPosition.x - this.target.position.x;
    const dy = this.targetPosition.y - this.target.position.y;

    this.target.angle = Math.atan2(dy, dx);
  }

  onUpdate(deltaTime: number): void {
    switch(this.target.state) {
      case EagleState.WAIT:
        this.wait(deltaTime);
        this.passive(deltaTime);
      break;
      case EagleState.ENTER_SCREEN:
        this.enterScreen(deltaTime);
      break;
      case EagleState.ATTACK:
        this.attack(deltaTime);
      break;
      case EagleState.SPAWN:
        this.spawn(deltaTime);
        this.passive(deltaTime);
      break;
      case EagleState.MOVE:
        this.move(deltaTime);
        this.passive(deltaTime);
      break;
    }
  }

  private passive(deltaTime: number ) {
    if(this.passiveAttackTimer >= this.passiveAttackCooldown) {
      this.passiveAttack();
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
      this.target.state = EagleState.SPAWN;
    } else {
      this.target.position.x += Math.cos(this.target.angle) * this.target.speed * deltaTime/1000;
      this.target.position.y += Math.sin(this.target.angle) * this.target.speed * deltaTime/1000;
    }
  }

  private attack(deltaTime: number): void {
    this.target.bulletInvulnerable = false;
    this.target.collisionInvulnerable = false;

    if(this.attackTimer >= this.attackCooldown) {
      this.activeAttack();
      this.attackTimer = 0;
    } else {
      this.attackTimer += deltaTime;
    }

    if(this.attackPhaseTimer >= this.attackPhaseCooldown) {
      this.attackPhaseTimer = 0;
      this.moveCooldown = (Math.random() * 2000) + 8000;
      this.moveTimer = 0;
      this.target.state = EagleState.MOVE;
      this.nextState = EagleState.SPAWN;
    } else {
      this.attackPhaseTimer += deltaTime;
    }

  }

  private spawn(deltaTime: number): void {
    if(this.target.$state.numberEnemies() > 1) {
      this.target.state = EagleState.ATTACK;
      return;
    }
    this.target.bulletInvulnerable = true;
    this.target.collisionInvulnerable = true;

    this.target.$state.addEnemy(new Tank({ position: new Position(-200, 600), moveTo: new Position(300, 600) }));
    this.target.$state.addEnemy(new Tank({ position: new Position(1800, 600), moveTo: new Position(1300, 600) }));
    this.target.$state.addEnemy(new Tank({ position: new Position(-200, 400), moveTo: new Position(300, 400) }));
    this.target.$state.addEnemy(new Tank({ position: new Position(1800, 400), moveTo: new Position(1300, 400) }));
    if( this.target.$state.currentWave > 20) {
      this.target.$state.addEnemy(new Tank({ position: new Position(-200, 400), moveTo: new Position(300, 200) }));
      this.target.$state.addEnemy(new Tank({ position: new Position(1800, 400), moveTo: new Position(1300, 200) }));
    }

    this.waitCooldown = 4000;
    this.moveCooldown = (Math.random() * 2000) + 8000;
    this.moveTimer = 0;
    this.target.state = EagleState.WAIT;
    this.nextState = EagleState.MOVE;
  }

  private move(deltaTime: number): void {
    this.target.bulletInvulnerable = false;
    this.target.collisionInvulnerable = false;

    this.target.position.x += this.moveDirection * this.target.speed * deltaTime / 1000;

    if(this.target.position.x >= 1400) {
      this.moveDirection = -1;
    }
    if( this.target.position.x <= 200) {
      this.moveDirection = 1;
    }

    if( this.moveTimer >= this.moveCooldown ) {
      this.moveTimer = 0;
      if( this.nextState == EagleState.MOVE ) {
        this.nextState = EagleState.ATTACK;
      }
      this.target.state = this.nextState;
    } else if (this.moveTimer < this.moveCooldown) {
      this.moveTimer += deltaTime;
    }
  }

  private passiveAttack() {
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

    let bullet;

    bullet = new Bullet(options);
    bullet.position = new Position(this.target.position.x, this.target.position.y - 120);
    bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = new Position(this.target.position.x - 70, this.target.position.y - 83);
    bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = new Position(this.target.position.x + 70, this.target.position.y - 83);
    bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
    this.target.$state.addBullet(bullet);
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

    let bullet;

    bullet = new Bullet(options);
    bullet.position = new Position(this.target.position.x, this.target.position.y - 120);
    bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = new Position(this.target.position.x - 70, this.target.position.y - 83);
    bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = new Position(this.target.position.x + 70, this.target.position.y - 83);
    bullet.registerBehaviour("path", new StraightLineDownPath(bullet));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = new Position(this.target.position.x - 140, this.target.position.y - 83);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: -Math.PI/2 - Math.PI/8}));
    this.target.$state.addBullet(bullet);

    bullet = new Bullet(options);
    bullet.position = new Position(this.target.position.x + 140, this.target.position.y - 83);
    bullet.registerBehaviour("path", new StraightAnglePath(bullet, {angle: -Math.PI/2 + Math.PI/8}));
    this.target.$state.addBullet(bullet);
  }
}
