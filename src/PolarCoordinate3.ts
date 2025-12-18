import type { Vector3 } from "./Vector3";

class PolarCoordinate3 {
  private _phi: number;
  private _theta: number;
  private _radius: number;

  constructor(
    phi: number,
    theta: number,
    radius: number
  ) {
    this._phi = phi;
    this._theta = theta;
    this._radius = radius;
  }

  get phi(): number {
    return this._phi;
  }

  set phi(value: number) {
    this._phi = value;
  }

  get theta(): number {
    return this._theta;
  }

  set theta(value: number) {
    this._theta = value;
  }

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }

  toPosition(out: Vector3): void {
    const {phi, theta, radius} = this;
    const {cos, sin} = Math;
    const sinTheta = sin(theta);
    const x = radius * sinTheta * cos(phi);
    const y = radius * sinTheta * sin(phi);
    const z = radius * cos(theta);
    out.setValues(x, y, z);
  }

  toUpVector(out: Vector3): void {
    const {phi, theta} = this;
    const {cos, sin} = Math;
    const cosTheta = cos(theta);
    const x = -cosTheta * cos(phi);
    const y = -cosTheta * sin(phi);
    const z = sin(theta);
    out.setValues(x, y, z);
  }

  toRightVector(out: Vector3): void {
    const {phi} = this;
    const {cos, sin} = Math;
    const x = -sin(phi);
    const y = cos(phi);
    const z = 0;
    out.setValues(x, y, z);
  }
}

export {PolarCoordinate3};
