import { Room } from 'colyseus';
import { GameState } from '../models/gamestate';

import { JWTHelper } from '../helpers/JWTHelper';

export class GameRoom extends Room<GameState> {

  maxClients = 4;

  onCreate(options) {
    this.setState(new State());
  }

  onAuth(client, options) {
    const isValidToken = await JWTHelper.verifyToken(options.token);

    if(!isValidToken) {
      this.send(client, {
        error: 'error_invalid_token'
      });
      return false;
    }

    let username = JWTHelper.extractUsernameFromToken(options.token)

    return username;
  }

  onJoin(client, options, username) {
    this.state.addPlayer() //Need to figure out how we are getting the ship
  }

  onMessage(client, data) {

  }

  onLeave(client) {
    this.state.removePlayer() //Need to figure out how we are getting the ship
  }

  onDispose() {

  }

}
