import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { StraightLinePath } from '../../behaviours/Enemy/movement/StraightLinePath';
import { FiresBulletBehaviour } from '../../behaviours/Enemy/FiresBulletBehaviour';
import { EnemyBullet } from '../../models/primary/EnemyBullet';
import { C, CT } from '../../Constants';


export class Blaster extends Enemy {

  constructor(options) {
    super(options);
    this.healthBase = 1;
    this.healthGrowth = 0.1;

    this.speedBase = 75;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "blaster";

    this.radius = 30;
  }

  onInitGame(state: GameState) {
    super.onInitGame(state);
    this.registerBehaviours([new StraightLinePath(this)]);

    const bulletOptions = {
      system: EnemyBullet,
      damage: 1,
      speed: 300,
      range: 500,
      collisionType: CT.CIRCLE,
      radius: 25,
      bulletMesh: "Enemy1",
      x: this.position.x,
      y: this.position.y,
      bulletType: C.ENEMY_BULLET,
      cooldown: 3000,
      behaviour: 'fires'
    }
    this.registerBehaviour(new FiresBulletBehaviour(this, {bulletOptions: bulletOptions}));
  }

}
