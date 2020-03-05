import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { MoveToLocationPath } from '../../behaviours/Enemy/movement/MoveToLocationPath';
import { FiresBulletBehaviour } from '../../behaviours/Enemy/FiresBulletBehaviour';
import { EnemyBullet } from '../../models/primary/EnemyBullet';
import { C, CT } from '../../Constants';


export class Blaster2 extends Enemy {

  constructor(options: any) {
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

  onInitGame(state: GameState): void {
    super.onInitGame(state);
    let moveAgain = () => {
      new MoveToLocationPath(this, null, moveAgain);
    }
    this.registerBehaviour("path", new MoveToLocationPath(this, null, moveAgain));

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
