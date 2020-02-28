import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { MoveToLocationThenRotatePath } from '../../behaviours/Enemy/movement/MoveToLocationThenRotatePath';
import { FiresBulletBehaviour } from '../../behaviours/Enemy/FiresBulletBehaviour';
import { EnemyBullet } from '../../models/primary/EnemyBullet';
import { C, CT } from '../../Constants';
import { Position } from '../../models/Position';


export class Tank extends Enemy {

  moveTo: Position;

  constructor(options:any) {
    super(options);
    this.healthBase = 1;
    this.healthGrowth = 0.1;

    this.speedBase = 75;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "tank";

    this.radius = 30;

    this.moveTo = options.moveTo || Position.randomOnScreen();
  }

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    this.registerBehaviour("path", new MoveToLocationThenRotatePath(this, { moveTo: this.moveTo }));

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
      cooldown: 5000,
      behaviour: 'fires'
    }
    this.registerBehaviour("primary", new FiresBulletBehaviour(this, {bulletOptions: bulletOptions}));
  }

}
