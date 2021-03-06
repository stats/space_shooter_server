import { Entity } from '../models/Entity';
/**
 * A base class to be extended from when creating custom behaviours.
 * A behaviour could be handling input, movement patterns, or
 * tracking damage taken.
 **/
export class Behaviour {
  public target: Entity;
  public eventType: string;

  private _enabled = true;

  constructor(type: string, target: any, onCompleteState?: number) {
    this.eventType = type;
    this.target = target;
  }

  /**
   * Methods to override in an extended Behaviour.
   * Not all methods must be overridden, only those used
   * by the behaviour.
   **/
  public onEvent(args: any): void {
    // do nothing.
  }
  public onUpdate(deltaTime: number): void {
    // do nothing.
  }
  public onEnabled(): void {
    // do nothing.
  }
  public onDisabled(): void {
    // do nothing.
  }
  public onRegistered(): void {
    // do nothing.
  }
  public onRemoved(): void {
    // do nothing.
  }

  public enable(): void {
    this._enabled = true;
    this.onEnabled();
  }

  public disable(): void {
    this._enabled = false;
    this.onDisabled();
  }

  public isEnabled(): boolean {
    return this._enabled;
  }
}
