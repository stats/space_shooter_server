import { Enemy } from '../Enemy';
import { StraightLinePath } from '../../behaviours/Enemy/movement/StraightLinePath';
import { FiresBulletBehaviour } from '../../behaviours/Enemy/FiresBulletBehaviour';
import { EnemyBullet } from '../../models/primary/EnemyBullet';
import { Position } from '../Position';
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

    this.bulletOffsets = [
      new Position(32, -18),
      new Position(20, -18),
      new Position(-20, -18),
      new Position(-32, -18)
    ];

    const bulletOptions = {
      system: EnemyBullet,
      damage: 1,
      speed: 300,
      range: 500,
      collisionType: CT.CIRCLE,
      radius: 25,
      bulletMesh: "EnemyBeam",
      bulletType: C.ENEMY_BULLET,
      cooldown: 3000,
      behaviour: 'fires'
    }
    this.registerBehaviour("primary", new FiresBulletBehaviour(this, bulletOptions));

  }

}
