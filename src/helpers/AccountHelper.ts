import { DB } from '../Database';
import { Account } from '../models/Account';

export class AccountHelper {

  static async getAccountByEmail(email: string): Promise<Account> {
    const account = await DB.$accounts.findOne({ email: email });
    if(account) return new Account(account);
    return null;
  }

  static async getAccountByUsername(username: string): Promise<Account> {
    const account = await DB.$accounts.findOne({ username: username });
    if(account) return new Account(account);
    return null;
  }

  static async getAccountBySystemID(systemId: string): Promise<Account> {
    const account = await DB.$accounts.findOne({ systemId });
    if(account){
      return new Account(account);
    } else {
      const tmpAct = new Account({systemId});
      return new Account(DB.$accounts.insertOne(tmpAct.toSaveObject()));
    }
  }

  static async createAccount(account: Account): Promise<any> {
    return DB.$accounts.insertOne(account.toSaveObject());
  }

  static async saveAccount(account: Account): Promise<any> {
    return DB.$accounts.updateOne({ username: account.username }, { $set: account.toSaveObject() });
  }

  static async clearInGame(username: string): Promise<any> {
    return DB.$ships.updateMany({username}, {$set: {inGame: -1}});
  }
}
