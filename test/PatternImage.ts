import { GameState } from '../src/models/GameState';
import { Spawner } from '../src/spawner2/Spawner';

let room = {
  state: new GameState(),
  announceNextWave: () => {
    //do nothing.
  }
}
room.state.currentWave = 1;

let spawner = new Spawner(room);

let spawns = spawner.getSpawns();

for(let i = 0; i < spawns.length; i++) {
  console.log(spawns[i].time, spawns[i].enemy.constructor.name, spawns[i].enemy.position.x, spawns[i].enemy.position.y);
}


room.state.currentWave = 5;
spawner = new Spawner(room);
spawns = spawner.getSpawns();

for(let i = 0; i < spawns.length; i++) {
  console.log(spawns[i].time, spawns[i].enemy.constructor.name, spawns[i].enemy.position.x, spawns[i].enemy.position.y);
}

room.state.currentWave = 10;
spawner = new Spawner(room);
spawns = spawner.getSpawns();

for(let i = 0; i < spawns.length; i++) {
  console.log(spawns[i].time, spawns[i].enemy.constructor.name, spawns[i].enemy.position.x, spawns[i].enemy.position.y);
}
