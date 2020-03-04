import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { MoveToLocationPath } from '../../behaviours/Enemy/movement/MoveToLocationPath';
import { RotateInCircle } from '../../behaviours/Enemy/movement/RotateInCircle';
import { FiresBulletBehaviour } from '../../behaviours/Enemy/FiresBulletBehaviour';
import { EnemyBullet } from '../../models/primary/EnemyBullet';
import { C, CT } from '../../Constants';
import { Position } from '../../models/Position';


export class Tank extends Enemy {

  moveTo: Position;

  constructor(options: any) {
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
      cooldown: 5000,
      behaviour: 'fires'
    }
    this.registerBehaviour("primary", new FiresBulletBehaviour(this, {bulletOptions: bulletOptions}));
    this.registerBehaviour("path", new MoveToLocationPath(this, this.moveTo, () => {
      new RotateInCircle(this);
    }));
  }

}