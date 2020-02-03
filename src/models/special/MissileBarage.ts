import { Ship } from '../ship';

export class MissileBarage {

  private target:Ship;

  constructor(target:Ship) {
    this.target = target;
  }

  handleEvent() {
    handleEvent() {
      for(let i = 0; i < 6; i++) {
        let spawn_location = this.target.getBulletSpawnLocation();
        let bullet:Bullet = new Bullet({
          damage: this.target.getDamage() / 3,
          speed: 500,
          range: 250,
          collision_type: CT.CIRCLE,
          radius: 15,
          bullet_mesh: 0,
          x: spawn_location.x - 45 + (i * 15),
          y: spawn_location.y,
          bullet_type: C.SHIP_BULLET
        });

        bullet.registerBehaviour(new MissilePath(bullet));
        bullet.fired_by = this.target;
        this.target.$state.addBullet(bullet);
      }
  }

}
