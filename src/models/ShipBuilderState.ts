import {Schema, type} from '@colyseus/schema';
import { Statistics } from './Statistics';
import { UnlockMessage } from './UnlockMessage';
import { ErrorMessage } from './ErrorMessage';
import { ShipList } from './ShipList';

export class ShipBuilderState extends Schema {

  /**
   * This just a dummy state file used to expose other schema objects.
   * Exposing types that will be used during OnMessage callbacks below.
   **/
  @type(Statistics)
  stats: Statistics;

  @type(UnlockMessage)
  unlockMessage: UnlockMessage;

  @type(ErrorMessage)
  error: ErrorMessage;

  @type(ShipList)
  shipList: ShipList;
}
