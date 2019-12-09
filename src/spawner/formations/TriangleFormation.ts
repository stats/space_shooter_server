import { Formation } from './formation';
import { C } from '../../constants';

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

  onSpawnEnemies(spawn_type:any) {
    let side:number = Math.floor(Math.random() * 3);
    let start_x:number, start_y:number;
    switch(side) {
      case 0:
        start_y = C.BOUNDS.maxY + C.SPAWN_OFFSET;
        start_x = (Math.random() * (C.BOUNDS.maxX - 200)) + 100;
        break;
      case 1:
        start_y = (Math.random() * (C.BOUNDS.maxY/2 - 200)) + 100;
        start_x = -C.SPAWN_OFFSET;

        break;
      case 2:
        start_y = (Math.random() * (C.BOUNDS.maxY/2 - 200)) + 100;
        start_x = C.BOUNDS.maxX + C.SPAWN_OFFSET;
        break;
    }

    let spawns = 1;
    if(this.state.current_wave > 5) {
      spawns = 3;
    } else if (this.state.current_wave > 10 ) {
      spawns = 6;
    } else if (this.state.current_wave > 20 ) {
      spawns = 10;
    } else if (this.state.current_wave > 30 ) {
      spawns = 15;
    }

    for(var i = 0; i < spawns; i++) {
      if(side == 1) {
        this.state.addEnemy(new spawn_type({x: start_y - this.positions[i][1], y: start_x + this.positions[i][0]}));
      } else if (side == 2) {
        this.state.addEnemy(new spawn_type({x: start_y + this.positions[i][1], y: start_x - this.positions[i][0]}));
      } else {
        this.state.addEnemy(new spawn_type({x:start_x + this.positions[i][0], y: start_y + this.positions[i][1]}));
      }
    }
  }

}
