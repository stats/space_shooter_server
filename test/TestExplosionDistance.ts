import assert from "assert";
import { GameState } from "../src/models/GameState";
import { Enemy } from "../src/models/Enemy";
import { CollisionHelper } from "../src/helpers/CollisionHelper";

describe("Ranges", () => {
  it("Should capture enemies in range", () => {
    let state:GameState = new GameState();
    let enemy1:Enemy = new Enemy({});
    enemy1.position.x = 0;
    enemy1.position.y = 25;
    let enemy2:Enemy = new Enemy({});
    enemy2.position.x = 0;
    enemy2.position.y = -25;

    state.addEnemy(enemy1);
    state.addEnemy(enemy2);
    let entities = state.getEnemiesInRange(0, 0, 50, true);
    assert.equal(entities.length, 2);
  });

  it("Should exclude enemies out of range", () => {
    let state:GameState = new GameState();
    let enemy1:Enemy = new Enemy({});
    enemy1.position.x = 0;
    enemy1.position.y = 25;
    let enemy2:Enemy = new Enemy({});
    enemy2.position.x = 0;
    enemy2.position.y = -25;

    state.addEnemy(enemy1);
    state.addEnemy(enemy2);
    let entities = state.getEnemiesInRange(0, 0, 15, true);
    assert.equal(entities.length, 0);
  });

  it("Should capture invisible enemies in range", () => {
    let state:GameState = new GameState();
    let enemy1:Enemy = new Enemy({});
    enemy1.position.x = 0;
    enemy1.position.y = 25;
    let enemy2:Enemy = new Enemy({});
    enemy2.position.x = 0;
    enemy2.position.y = -25;
    enemy2.invisible = true;

    state.addEnemy(enemy1);
    state.addEnemy(enemy2);
    let entities = state.getEnemiesInRange(0, 0, 150, true);
    assert.equal(entities.length, 2);
  });
})
