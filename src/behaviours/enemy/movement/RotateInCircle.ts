import { Behaviour, C, Enemy, Position, CollisionHelper } from '../../../Internal';

export class RotateInCircle extends Behaviour {

  rotationDirection = 1;

  target: Enemy;

  constructor(target: Enemy) {
    super('RotateInCircle', target);
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
  }

  onUpdate(deltaTime: number): void {
    this.target.angle += this.rotationDirection * 0.5 * deltaTime/1000;
  }
}
