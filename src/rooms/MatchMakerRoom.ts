import { Room, Client, matchMaker } from 'colyseus';
import { JWTHelper, ShipHelper } from '../Internal';

interface MatchmakingGroup {
  averageRank: number;
  clients: ClientStat[];
  priority?: boolean;

  ready?: boolean;
  confirmed?: number;
}

interface ClientStat {
  client: Client;
  waitingTime: number;
  options?: any;
  group?: MatchmakingGroup;
  rank: number;
  confirmed?: boolean;
}

export class MatchMakerRoom extends Room {
  allowUnmatchedGroups = true;

  evaluateGroupInterval = 2000;

  groups: MatchmakingGroup[]  = [];

  roomToCreate = 'GameRoom';

  maxWaitingTime: number = 60 * 1000;

  maxWaitingTimeForPriority?: number = 30 * 1000;

  numClientsToMatch = 4;

  stats: ClientStat[] = [];

  clientShipHash: any = {};

  onCreate(options: any): void {
    if(options.maxWaitingTime) {
      this.maxWaitingTime = options.maxWaitingTime;
    }

    if(options.numClientsToMatch) {
      this.numClientsToMatch = options.numClientsToMatch;
    }

    this.setSimulationInterval(() => this.redistributeGroups(), this.evaluateGroupInterval);
  }

  async onAuth(client, options): Promise<any> {
    const isValidToken = await JWTHelper.verifyToken(options.token);

    if(!isValidToken) {
      this.send(client, {
        error: 'error_invalid_token'
      });
      return false;
    }

    const username = JWTHelper.extractUsernameFromToken(options.token);

    return username;
  }

  async onJoin(client: Client, options: any, username: string): Promise<void> {
    console.log('[MatchMakerRoom] (onJoin)', username, "rank:", options.rank);
    this.stats.push({
      client: client,
      rank: options.rank,
      waitingTime: 0,
      options
    });

    const ship = await ShipHelper.getShipInGame(username);
    if(!ship) {
      this.send(client, { error: 'no_ship_in_game'});
      return;
    }
    this.clientShipHash[client.id] = ship;

    this.send(client, 1);
  }

  onMessage(client: Client, message: any): void{
    if(message === 1) {
      const stat = this.stats.find(stat => stat.client === client);

      if(stat && stat.group && typeof(stat.group.confirmed) === "number") {
        stat.confirmed = true;
        stat.group.confirmed++;

        if(stat.group.confirmed === stat.group.clients.length) {
          stat.group.clients.forEach(client => client.client.close());
        }
      }
    }
  }

  createGroup(): MatchmakingGroup {
    const group: MatchmakingGroup = { clients: [], averageRank: 0};
    this.groups.push(group);
    return group;
  }

  redistributeGroups(): void {
    this.groups = [];

    const stats = this.stats.sort((a, b) => a.rank - b.rank);

    let currentGroup: MatchmakingGroup = this.createGroup();
    let totalRank = 0;

    for(let i = 0, l = stats.length; i < l; i++) {
      const stat = stats[i];
      stat.waitingTime += this.clock.deltaTime;

      if (stat.group && stat.group.ready) {
        continue;
      }

      if(currentGroup.clients.length === this.numClientsToMatch) {
        currentGroup = this.createGroup();
        totalRank = 0;
      }

      if( stat.waitingTime >= this.maxWaitingTime && this.allowUnmatchedGroups) {
        currentGroup.ready = true;
      } else if (
        this.maxWaitingTimeForPriority !== undefined &&
        stat.waitingTime >= this.maxWaitingTimeForPriority
      ) {
        currentGroup.priority = true;
      }

      if(
        currentGroup.averageRank > 0 &&
        !currentGroup.priority
      ) {
        const diff = Math.abs(stat.rank - currentGroup.averageRank);
        const diffRatio = (diff / currentGroup.averageRank);

        if(diffRatio > 2) {
          currentGroup = this.createGroup();
          totalRank = 0;
        }
      }

      stat.group = currentGroup;
      currentGroup.clients.push(stat);

      totalRank += stat.rank;

      currentGroup.averageRank = totalRank / currentGroup.clients.length;
    }
    this.checkGroupsReady();
  }

  async checkGroupsReady(): Promise<void> {
    await Promise.all(
      this.groups
        .map(async (group) => {
          if(group.ready || group.clients.length === this.numClientsToMatch) {
            group.ready = true;
            group.confirmed = 0;

            let count = 0;
            let rankings = 0;
            for(const client of group.clients) {
              count += 1;
              rankings += client.rank;
            }

            const waveRank = Math.max(Math.round(rankings/count) - 5, 1);
            console.log("[MatchMakerRoom] Creating Room with Rank:", waveRank);
            const room = await matchMaker.createRoom(this.roomToCreate, {waveRank: waveRank}); //TODO: Set the waveRank to be the correct wave rank

            await Promise.all(group.clients.map(async (client) => {
              const matchData = await matchMaker.reserveSeatFor(room, client.options);
              this.send(client.client, matchData);
            }));
          } else {
            const ships = [];
            for(let i = 0; i < group.clients.length; i++) {
              const ship = this.clientShipHash[group.clients[i].client.id];
              ships.push(ship)
            }
            group.clients.forEach(client => this.send(client.client, { ships: ships }));
          }
        })
    );
  }

  onLeave(client: Client, ): void {
    const index = this.stats.findIndex(stat => stat.client === client);
    this.stats.splice(index, 1);
    delete this.clientShipHash[client.id];
  }
}
