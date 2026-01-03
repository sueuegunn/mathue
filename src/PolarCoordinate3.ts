import type { Vector3 } from "./Vector3";

class PolarCoordinate3 {
  private _phi: number;
  private _theta: number;
  private _radius: number;

  /**
   * @param phi polar angle phi in range [0, π] in radians
   * @param theta azimuthal angle theta in range [0, 2π] in radians
   * @param radius radial distance from the origin, must be non-negative
   */
  constructor(
    phi: number,
    theta: number,
    radius: number
  ) {
    this._phi = phi;
    this._theta = theta;
    this._radius = radius;
  }

  /**
   * Gets polar angle phi in range [0, π] in radians, measured from positive z-axis.
   */
  get phi(): number {
    return this._phi;
  }

  /**
   * Sets polar angle phi in range [0, π] in radians, measured from positive z-axis.
   * @param value polar angle in range [0, π]
   */
  set phi(value: number) {
    this._phi = value;
  }

  /**
   * Gets azimuthal angle theta in range [0, 2π] in radians, measured from the positive x-axis.
   */
  get theta(): number {
    return this._theta;
  }

  /**
   * Sets azimuthal angle theta in range [0, 2π] in radians, measured from the positive x-axis.
   * @param value azimuthal angle in range [0, 2π]
   */
  set theta(value: number) {
    this._theta = value;
  }

  /**
   * Gets radial distance from the origin, must be non-negative.
   */
  get radius(): number {
    return this._radius;
  }

  /**
   * Sets radial distance from the origin, must be non-negative.
   */
  set radius(value: number) {
    this._radius = value;
  }

  /**
   * Converts polar coordinate to Vector3 and stores result in `out` vector. 
   * @param out vector instance to receive result
   * @returns {void}
   */
  toVector3(out: Vector3): void {
    const {phi, theta, radius} = this;
    const {cos, sin} = Math;
    const sinTheta = sin(theta);
    const x = radius * sinTheta * cos(phi);
    const y = radius * sinTheta * sin(phi);
    const z = radius * cos(theta);
    out.set(x, y, z);
  }

  /**
   * Converts to tangent vector pointing positive z-axis direction, and sotres result in `out` vector.
   * @param out vector instance to receive result
   * @returns {void}
   */
  toTangentZ(out: Vector3): void {
    const {phi, theta} = this;
    const {cos, sin} = Math;
    const cosTheta = cos(theta);
    const x = -cosTheta * cos(phi);
    const y = -cosTheta * sin(phi);
    const z = sin(theta);
    out.set(x, y, z);
  }
}

export {PolarCoordinate3};
