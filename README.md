* Space Shooter Server *

* Setup *

mkdir db
mkdir db\development
mkdir build
mkdir build\codegen

* Todo List *

- Create and use Event Manager instead of passing around objects
  https://learn.unity.com/tutorial/create-a-simple-messaging-system-with-events#5cf5960fedbc2a281acd21fa
- Update the ship code so that it sets ShipData better
- Figure out unity to server bounding boxes and ship movement
- Create Loading Screens
  - Ship Builder Login
  - Match Maker Loading
  - Starting the Game Countdown
- Style buttons for space theme and make them prefabs
- Add primary and secondary attacks to ship ShipBuilder
- Allow deleting of Ships from ShipBuilder
- The game needs to spawn enemies and bullets
- Track number of ships create and deleted
- Track number of enemies killed by type
- Gain Experience and level up abilities for the ship




A server for a colyseus space shooter game

- Player does not have to create an account. They can join and the server will recognize their device ID.
- Player enters the ship yard. They can then either select one of their existing ships or create a new ship using the parts they have unlocked.
- Player can then choose to do a solo run or enter the matchmaker which will results in a player being put in a GameRoom
- Player enters the game room and starts fighting waves of galaga style enemies
- At the end players earn credits based on the scores earned. Credits must be immediately spent towards unlocking global upgrades.
- Players are then returned back to the main ship screen to play again.

- Players have shields - number of times they can be hit
- Players have weapons - fires different types of bullets
- Players have base speed - for movement in the X,Y plane
- Players have a special ability

- During a level players can get upgrades
- invulnerability
- extra bullets
- extra speed
- extra damage

- players gain rank by increasing the wave number they get to and will start at harder waves if they get further

- starting wave = max( wave_rank - 10, 1 )
- wave_rank = wave_rank + round( (current_wave - wave_rank) / 5 )
- matchmaker: starting wave = average(wave_rank)

- There are 32 spawners in a game.
- 16 spawners on the total
- 8 spawners on each side
