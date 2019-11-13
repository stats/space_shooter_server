import { MongoClient, ObjectID } from 'mongodb';

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/development';

class Database {
  public $accounts:any;
  public $ships:any;

  private client:MongoClient;
  private db:any;

  async init() {
    if(this.client) return;

    try {
      this.client = await MongoClient.connect(DB_URI, { useNewUrlParser: true });
      this.db = this.client.db('development');
    } catch (err) {
      console.log('[Database] Error', err);
      process.exit(0);
    }

    this.$accounts = this.db.collection('accounts');
    this.$ships = this.db.collection('ships');
  }
}

export const DB = new Database();
export const stringToObjectId = (str: string) => new ObjectID(str);
