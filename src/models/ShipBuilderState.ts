import {Schema, type} from '@colyseus/schema';
import { Statistics } from './Statistics';
import { UnlockMessage } from './UnlockMessage';

export class ShipBuilderState extends Schema {

  /**
   * This just a dummy state file used to expose other schema objects.
   * Exposing types that will be used during OnMessage callbacks below.
   **/
  @type(Statistics)
  stats:Statistics = new Statistics({});

  @type(UnlockMessage)
  unlockMessage:UnlockMessage = new UnlockMessage({});
}
