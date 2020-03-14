import { Enemy } from '../Enemy';
import { StraightLinePath } from '../../behaviours/Enemy/movement/StraightLinePath';
import { FiresBulletBehaviour } from '../../behaviours/Enemy/FiresBulletBehaviour';
import { EnemyBullet } from '../../models/primary/EnemyBullet';
import { C, CT } from '../../Constants';


export class Blaster extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 5;
    this.healthGrowth = 0.2;

    this.speedBase = 65;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "blaster";

    this.radius = 40;
  }

  onInitGame(state: any): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new StraightLinePath(this));

    let offset1 = this.position.clone();
    offset1.y -= 18;
    offset1.x += 32

    let offset2 = this.position.clone();
    offset2.y -= 18;
    offset2.x += 20;

    let offset3 = this.position.clone();
    offset3.y -= 18;
    offset3.x -= 32

    let offset4 = this.position.clone();
    offset4.y -= 18;
    offset4.x -= 20;

    const bulletOptions1 = {
      system: EnemyBullet,
      damage: 1,
      speed: 300,
      range: 500,
      collisionType: CT.CIRCLE,
      radius: 25,
      bulletMesh: "Enemy1",
      position: offset1,
      bulletType: C.ENEMY_BULLET,
      cooldown: 3000,
      behaviour: 'fires'
    }
    this.registerBehaviour("primary1", new FiresBulletBehaviour(this, bulletOptions1));

    const bulletOptions2 = {
      system: EnemyBullet,
      damage: 1,
      speed: 300,
      range: 500,
      collisionType: CT.CIRCLE,
      radius: 25,
      bulletMesh: "Enemy1",
      position: offset2,
      bulletType: C.ENEMY_BULLET,
      cooldown: 3000,
      behaviour: 'fires'
    }
    this.registerBehaviour("primary2", new FiresBulletBehaviour(this, bulletOptions2));

    const bulletOptions3 = {
      system: EnemyBullet,
      damage: 1,
      speed: 300,
      range: 500,
      collisionType: CT.CIRCLE,
      radius: 25,
      bulletMesh: "Enemy1",
      position: offset3,
      bulletType: C.ENEMY_BULLET,
      cooldown: 3000,
      behaviour: 'fires'
    }
    this.registerBehaviour("primary3", new FiresBulletBehaviour(this, bulletOptions3));

    const bulletOptions4 = {
      system: EnemyBullet,
      damage: 1,
      speed: 300,
      range: 500,
      collisionType: CT.CIRCLE,
      radius: 25,
      bulletMesh: "Enemy1",
      position: offset4,
      bulletType: C.ENEMY_BULLET,
      cooldown: 3000,
      behaviour: 'fires'
    }
    this.registerBehaviour("primary4", new FiresBulletBehaviour(this, bulletOptions4));
  }

}
