import { MapSchema, Schema, type, Room, Client } from '@colyseus/schema';
import { Ship } from '../models/ship';

class State extends Schema {
  @type({ map: Ship })
  public ships = new MapSchema<Ship>();
}

class MatchMakerRoom extends Room {
  public allowReconnectionTime:number = 0;

  public onCreate(options) {
    this.setState(new State());

    if( options.maxClients) {
      this.maxClients = options.maxClients;
    }

    if(options.allowReconnectionTime) {
      this.allowReconnectionTime = Math.min(options.allowReconnectionTime, 40);
    }

    if(options.metadata) {
      this.setMetadata(options.metadata);
    }
  }

  public onJoin(client: Client, options: any) {
    const ship = ShipHelper.getShip(client.username, options.uuid);
    ship.sessionId = client.sessionId;
    ship.connected = true;
    this.state.ships[client.sessionId] = ship;
  }

  public onMessage(client:Client, message: any) {
    if(typeof(message) === 'object' && !Array.isArray(message) ) {
      message.sessionId = client.sessionId;
    }
    this.broadcast(message, { except: client});
  }

  public asnyc onLeave(client:Client, consented: boolean ) {
    if(this.allowReconnectionTime > 0 ) {
      this.state.players[client.sessionId].connected = false;

      try {
        if(consented) {
          throw new Error('consented leave');
        }

        await this.allowReconnection(client, this.allowReconnectionTime);
        this.state.players[client.sessionId].connected = true;
      } catch(e) {
        delete this.state.players[client.sessionId];
      }
    }
  }

}
