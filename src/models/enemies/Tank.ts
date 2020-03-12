import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { MoveToLocationThenRotatePath } from '../../behaviours/Enemy/movement/MoveToLocationThenRotatePath';
import { FiresBulletBehaviour } from '../../behaviours/Enemy/FiresBulletBehaviour';
import { EnemyBullet } from '../../models/primary/EnemyBullet';
import { C, CT } from '../../Constants';
import { Position } from '../../models/Position';

export enum TankStates {
  MOVE,
  ROTATE
}


export class Tank extends Enemy {

  moveTo: Position;

  constructor(options: any) {
    super(options);
    this.healthBase = 5;
    this.healthGrowth = 0.2;

    this.speedBase = 75;
    this.speedGrowth = 5;

    this.collisionDamageBase = 1;
    this.collisionDamageGrowth = 0.1;

    this.modelType = "tank";

    this.radius = 30;

    this.moveTo = options.moveTo || this.randomMoveToLocation();
  }

  private randomMoveToLocation(): Position {
    let x = Math.random() * 6;
    if(this.position.x < 0) {
      x = x * 100;
    } else {
      x = (x * 100) + 900;
    }
    return new Position(x, this.position.y);
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
    this.registerBehaviour("primary", new FiresBulletBehaviour(this, bulletOptions));
    this.registerBehaviour("path", new MoveToLocationThenRotatePath(this, this.moveTo));
  }

}
