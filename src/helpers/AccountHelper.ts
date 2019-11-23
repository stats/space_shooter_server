import { DB } from '../database';
import { Account } from '../models/account';

export class AccountHelper {
  static async getAccountById(userId: string): Promise<Account> {
    const account = await DB.$accounts.findOne({userId});
    if(account) return new Account(account);
    return null;
  }

  static async getAccountByEmail(email: string): Promise<Account> {
    const account = await DB.$accounts.findOne({ email: email });
    if(account) return new Account(account);
    return null;
  }

  static async getAccountByUsername(username: string): Promise<Account> {
    const account = await DB.$accounts.findOne({ username });
    if(account) return new Account(account);
    return null;
  }

  static async getAccountBySystemID(system_id: string): Promise<Account> {
    const account = await DB.$accounts.findOne({ system_id });
    if(account){
      return new Account(account);
    } else {
      return new Account(DB.$accounts.insertOne({system_id}));
    }
  }

  static async createAccount(account: Account) {
    return DB.$accounts.insertOne(account.toSaveObject());
  }

  static async saveAccount(account: Account) {
    return DB.$accounts.updateOne({ username: account.username }, { $set: account.toSaveObject() });
  }

  static async clearInGame(username: string) {
    return DB.$ships.updateMany({username}, {$set: {inGame: -1}});
  }

}
