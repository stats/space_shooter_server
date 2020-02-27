import { Enemy } from '../Enemy';
import { GameState} from '../../models/GameState';
import { LoopingPath } from '../../behaviours/Enemy/movement/LoopingPath';
import { DropsBulletBehaviour } from '../../behaviours/Enemy/DropsBulletBehaviour';
import { EnemyBullet } from '../../models/primary/EnemyBullet';
import { C, CT } from '../../Constants';


export class Bomber extends Enemy {

  constructor(options) {
    super(options);
    this.health_base = 1;
    this.health_growth = 0.1;

    this.speed_base = 75;
    this.speed_growth = 5;

    this.collision_damage_base = 1;
    this.collision_damage_growth = 0.1;

    this.model_type = "bomber";

    this.radius = 30;
  }

  onInitGame(state:GameState) {
    super.onInitGame(state);
    this.registerBehaviours([new LoopingPath(this)]);

    let bullet_options = {
      system: EnemyBullet,
      damage: 1,
      speed: 200,
      range: 700,
      collision_type: CT.CIRCLE,
      radius: 25,
      bullet_mesh: "Enemy1",
      x: this.position.x,
      y: this.position.y,
      bullet_type: C.ENEMY_BULLET,
      cooldown: 3000,
      behaviour: 'drops'
    }
    this.registerBehaviour(new DropsBulletBehaviour(this, {bullet_options: bullet_options}));
  }

}
