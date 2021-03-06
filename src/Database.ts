import { MongoClient } from 'mongodb';

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/development';

class Database {
  public $accounts: any;
  public $ships: any;

  private client: MongoClient;
  private db: any;

  async init(): Promise<void> {
    if(this.client) return;

    try {
      this.client = await MongoClient.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      this.db = this.client.db('development');
    } catch (err) {
      console.log('[Database] Error', err);
      process.exit(0);
    }

    this.$accounts = this.db.collection('accounts');
    this.$accounts.createIndex({ username: 1 }, { unique: true });

    this.$ships = this.db.collection('ships');
    this.$ships.createIndex({ username: 1 });
  }
}

export const DB = new Database();
