import { DB } from '../Database';
import { Account } from '../models/Account';
import { CommandResult } from 'mongodb';

export class AccountHelper {

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

  static async getAccountBySystemID(systemId: string): Promise<Account> {
    const account = await DB.$accounts.findOne({ systemId });
    if(account){
      return new Account(account);
    } else {
      const tmpAct = new Account({systemId});
      return await AccountHelper.createAccount(tmpAct);
    }
  }

  static async createAccount(account: Account): Promise<Account> {
    const results: CommandResult = await DB.$accounts.insertOne(account.toSaveObject());
    if(results.error) {
      console.error('createAccount (error)', results.error);
      return null;
    }
    account = new Account(results.ops[0]);
    if(account) {
      account.updateUnlocks();
      const success: boolean = await AccountHelper.saveAccount(account);
      if(!success) return null;
      return account;
    }
    return null;
  }

  static async saveAccount(account: Account): Promise<boolean> {
    const results: CommandResult = DB.$accounts.updateOne({ username: account.username }, { $set: account.toSaveObject() });
    if(results.error) {
      console.error('saveAccount (error)', results.error);
      return false;
    }
    return true;
  }

  static async clearInGame(username: string): Promise<boolean> {
    const results: CommandResult = DB.$ships.updateMany({username}, {$set: {inGame: -1}});
    if(results.error) return false;
    return true;
  }
}
