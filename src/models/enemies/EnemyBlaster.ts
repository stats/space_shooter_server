import { Enemy, GameState, StraightLinePath, FiresBulletBehaviour, EnemyBullet, C, CT } from '../../Internal';

export class EnemyBlaster extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 5;
    this.healthGrowth = 0.2;

    this.speedBase = 65;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "blaster";

    this.radius = 30;
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new StraightLinePath(this));

    const bulletOptions = {
      system: EnemyBullet,
      damage: 1,
      speed: 300,
      range: 500,
      collisionType: CT.CIRCLE,
      radius: 25,
      bulletMesh: "Enemy1",
      position: this.position.clone(),
      bulletType: C.ENEMY_BULLET,
      cooldown: 3000,
      behaviour: 'fires'
    }
    this.registerBehaviour("primary", new FiresBulletBehaviour(this, bulletOptions));
  }

}
