# Space Shooter Server

A server for a colyseus space shooter game

## Setup

mkdir db
mkdir db\development
mkdir build
mkdir build\codegen

## Current Tasksart

- [ ] Add debug information to the room for figure out why it gets disposed
- [ ] Add the ability to modify ship attributes on the fly in development mode
- [ ] Add AI ships for testing
- [ ] Add an emote system
- [ ] Add primary and secondary attacks to ship ShipBuilder
- [ ] Track number of ships create and deleted
- [ ] Track number of enemies killed by type
- [ ] Handle error when building a null ship
- [ ] Add instructions on how to play the game
- [ ] Gain Experience and level up abilities for the ship
- [ ] Make the background of the gameroom move
- [ ] Add effects for air thrusters when ship moves side to side or backwards

### User Interface
- [ ] Add UI that shows secondary weapon fire_rate
- [ ] Add HUD for friendly ships
- [ ] Add ship names in the HUD under the ship
- [ ] Add popup warning to confirm destruction of a ship
- [ ] Show ship stats in the shipyard: rank, level, kills, abilities, primary and secondary
- [ ] Make ship acceleration a bar graph (maybe shaped like a plus) [----|==--]

### Networking
- [ ] Auto renew JWT token
- [ ] Message for server being down or not accessible
- [ ] Implement a heartbeat function
- [ ] Automatically handle server disconnect on client side

## Completed Tasks

- [x] allow initial login by device ID without password
- [x] Figure out unity to server bounding boxes and ship movement
- [x] Ship Builder Login Loading Screen
- [x] Match Maker Loading
- [x] Allow deleting of Ships from ShipBuilder
- [x] The game needs to spawn enemies
- [x] Show broadcast messages
- [x] Starting the Game Countdown
- [x] If no players in room stop room processing
- [x] Add button to the shipyard for returning to ship list
- [x] Style buttons for space theme and make them prefabs, update the UI with a nice space theme.
- [x] Ensure broadcast messages do not collide, or queue them
- [x] The game needs to spawn bullets
- [x] Utilize the event system for managing the game
- [x] Rewrite the screens UI to be modular
- [x] Add button from shipyard to logout
- [x] Create a HUD master class for managing all HUD events and updates
- [x] Show ship speed in UI
- [x] Show acceleration in UI
- [x] Show shields in the UI
- [x] Add UI that shows primary weapon fire_rate
- [x] Implement davidfig/intersects collision library for ellipse-ellipse and ellipse-circle collisions
- [x] Add bullet explosion effects
- [x] Add ship explosion effects


## Simple Design Documentation

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
