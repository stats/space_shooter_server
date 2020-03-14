import {Schema, type} from '@colyseus/schema';
import { Statistics, UnlockMessage, ErrorMessage, ShipList, Ship } from '../../Internal';

export class ShipBuilderState extends Schema {

  /**
   * This just a dummy state file used to expose other schema objects.
   * Exposing types that will be used during OnMessage callbacks below.
   **/

  @type(Ship)
  ship: Ship;

  @type(Statistics)
  stats: Statistics = new Statistics();

  @type(UnlockMessage)
  unlockMessage: UnlockMessage = new UnlockMessage();

  @type(ErrorMessage)
  error: ErrorMessage = new ErrorMessage("error");

  @type(ShipList)
  shipList: ShipList = new ShipList();

}
