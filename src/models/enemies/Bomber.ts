import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { LoopingPath } from '../../behaviours/Enemy/movement/LoopingPath';
import { FiresBulletBehaviour } from '../../behaviours/Enemy/FiresBulletBehaviour';
import { EnemyBullet } from '../../models/primary/EnemyBullet';
import { C, CT } from '../../Constants';


export class Bomber extends Enemy {

  constructor(options: any) {
    super(options);
    this.healthBase = 4;
    this.healthGrowth = 0.1;

    this.speedBase = 65;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "bomber";

    this.radius = 30;
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new LoopingPath(this));

    const bulletOptions = {
      system: EnemyBullet,
      damage: 1,
      speed: 200,
      range: 700,
      collisionType: CT.CIRCLE,
      radius: 25,
      bulletMesh: "Enemy1",
      position: this.position.clone(),
      bulletType: C.ENEMY_BULLET,
      cooldown: 3000,
      behaviour: 'drops'
    }
    this.registerBehaviour("primary", new FiresBulletBehaviour(this, bulletOptions));
  }

}
