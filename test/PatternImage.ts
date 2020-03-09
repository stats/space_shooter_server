import { GameState } from '../src/models/GameState';
import { Spawner } from '../src/spawner2/Spawner';

let room = {
  state: new GameState()
}
room.state.currentWave = 5;

let spawner = new Spawner(room);

let spawns = spawner.getSpawns();

for(var i = 0; i < spawns.length; i++) {
  console.log(spawns[i].time, spawns[i].enemy.constructor.name, spawns[i].enemy.position.x, spawns[i].enemy.position.y);
}
