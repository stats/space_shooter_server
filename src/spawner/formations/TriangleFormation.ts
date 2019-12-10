import { Formation } from './formation';
import { C, S } from '../../constants';

export class TriangleFormation extends Formation {

  positions:any = [
    [0,0],
    [40, -20],
    [40, 20],
    [80, -40],
    [80, 0],
    [80, 40],
    [120, -60],
    [120, -20],
    [120, 20],
    [120, 60],
    [160, -80],
    [160, -40],
    [160, 0],
    [160, 40],
    [160, 80]
  ];

  onSpawnEnemies(spawn_type:any, allowed_sides?:number[]) {
    let side:number, spawns:number, i:number, start_x:number, start_y:number;

    if (sides) {
      side = sample(sides);
    } else {
      side = Math.floor(Math.random() * 3);
    }

    switch(side) {
      case S.TOP:
        start_y = this.topOffset();
        start_x = this.randomX();
        break;
      case S.LEFT:
        start_y = this.randomY();
        start_x = this.leftOffset();
        break;
      case S.RIGTH:
        start_y = this.randomY();
        start_x = this.rightOffset();
        break;
    }

    spawns = 1;
    if(this.state.current_wave > 5) {
      spawns = 3;
    } else if (this.state.current_wave > 10 ) {
      spawns = 6;
    } else if (this.state.current_wave > 20 ) {
      spawns = 10;
    } else if (this.state.current_wave > 30 ) {
      spawns = 15;
    }

    for(i = 0; i < spawns; i++) {
      if(side == 1) {
        this.state.addEnemy(new spawn_type({x: start_x - this.positions[i][1], y: start_y + this.positions[i][0]}));
      } else if (side == 2) {
        this.state.addEnemy(new spawn_type({x: start_x + this.positions[i][1], y: start_y - this.positions[i][0]}));
      } else {
        this.state.addEnemy(new spawn_type({x: start_x + this.positions[i][0], y: start_y + this.positions[i][1]}));
      }
    }
  }

}
