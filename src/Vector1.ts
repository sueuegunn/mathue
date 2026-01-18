import type { Vector } from "./Vector";
import type { AdditiveGroup } from "./AdditiveGroup";
import type { Scalable } from "./Scalable";
import type { Normalizable } from "./Normalizable";
import type { Clonable } from "./Clonable";
import { Matrix4 } from "./Matrix4";
import type { Quaternion } from "./Quaternion";
import { Matrix3 } from "./Matrix3";

const INDEX_X = 0;

class Vector1 implements Vector<1>, AdditiveGroup<Vector1>, Scalable<Vector1>, Normalizable<Vector1>, Clonable<Vector1> {
  /**
   * @example
   * ```ts
   * const v = new Vector1(2);
   * console.log(v.dimension); // 1
   * ```
   */
  readonly dimension = 1;

  /**
   * @example
   * ```ts
   * const v = new Vector1(2);
   * console.log(v.elements); // [1]
   * ```
   */
  readonly elements: [number];

  private static _tmpMatrix3?: Matrix3;
  private static get tmpMatrix3(): Matrix3 {
    if (!this._tmpMatrix3) {
      this._tmpMatrix3 = Matrix3.identity();
    }
    return this._tmpMatrix3;
  }

  private static _tmpMatrix4?: Matrix4;
  private static get tmpMatrix4(): Matrix4 {
    if (!this._tmpMatrix4) {
      this._tmpMatrix4 = Matrix4.identity();
    }
    return this._tmpMatrix4;
  }

  /**
   * @example
   * ```ts
   * const v = new Vector1(2);
   * ```
   */
  constructor(x: number) {
    this.elements = [x];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector1(2);
   * console.log(v.x); // 2
   * ```
   */
  get x(): number {
    return this.elements[INDEX_X];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector1(2);
   * v.x = 3;
   * console.log(v.x); // 3
   * ```
   */
  set x(x: number) {
    this.elements[INDEX_X] = x;
  }

  /**
   * Sets x component (mutate this)
   * @param x 
   * @returns this instance, for method chaining
   */
  setX(x: number): Vector1 {
    this.x = x;
    return this;
  }

  /**
   * Creates a zero vector instance
   * @returns new zero vector instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const v = Vector1.zero();
   * console.log(v.x); // 0
   * ```
   */
  static zero(): Vector1 {
    return new Vector1(0);
  }

  /**
   * Creates a all ones vector instance
   * @returns new one vector instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const v = Vector1.one();
   * console.log(v.x); // 1
   * ```
   */
  static one(): Vector1 {
    return new Vector1(1);
  }

  /**
   * Creates new instance has same element (pure)
   * @returns new cloned vector instance
   * 
   * @example
   * ```ts
   * const v = new Vector1(2);
   * const c = v.clone();
   * console.log(c.x); // 2
   * ```
   */
  clone(): Vector1 {
    const {x} = this;
    return new Vector1(x);
  }

  /**
   * Determines if this vector is the zero vector
   * @returns `true` if this vector is exactly zero, `false` otherwise
   * 
   * @example
   * ```ts
   * const zero = Vector1.zero();
   * const one = Vector1.one();
   * console.log(zero.isZero()); // true
   * console.log(one.isZero()); // false
   * ```
   */
  isZero(): boolean {
    return this.x === 0;
  }

  /**
   * Sets element value (mutates this)
   * @param x element value
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector1(2);
   * v.set(3);
   * console.log(v.x); // 3
   * ```
   */
  set(x: number): Vector1 {
    this.x = x;
    return this;
  }

  /**
   * Copies element value from other vector (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector1(1);
   * const v2 = new Vector1(2);
   * v1.copy(v2);
   * console.log(v1.x); // 2
   * console.log(v2.x); // 2
   * ```
   */
  copy(other: Vector1): Vector1 {
    this.x = other.x;
    return this;
  }

  /**
   * Adds by other vector (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector1(2);
   * const v2 = new Vector1(3);
   * v1.add(v2);
   * console.log(v1.x); // 5
   * console.log(v2.x); // 3
   * ```
   */
  add(other: Vector1): Vector1 {
    this.x += other.x;
    return this;
  }

  /**
   * Subtracts by other vector (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector1(2);
   * const v2 = new Vector1(3);
   * v1.subtract(v2);
   * console.log(v1.x); // -1
   * console.log(v2.x); // 3
   * ```
   */
  subtract(other: Vector1): Vector1 {
    this.x -= other.x;
    return this;
  }

  /**
   * Multiplies element by scalar (mutates this)
   * @param scalar
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector1(2);
   * v.multiplyScalar(3);
   * console.log(v.x); // 6
   * ```
   */
  multiplyScalar(scalar: number): Vector1 {
    this.x *= scalar;
    return this;
  }

  /**
   * Divides element by scalar (mutates this)
   * @param scalar
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector1(6);
   * v.divideScalar(2);
   * console.log(v.x); // 3
   * ```
   */
  divideScalar(scalar: number): Vector1 {
    this.x /= scalar;
    return this;
  }

  /**
   * Calculates the length of this vector
   * @returns the length of this vector (always non-negative)
   * 
   * @example
   * ```ts
   * const v = new Vector1(2);
   * console.log(v.length()); // 2
   * ```
   */
  length(): number {
    return Math.abs(this.x);
  }

  /**
   * Normalizes this vector to length 1
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector1(-2);
   * v.normalize();
   * console.log(v.x); // -1
   * ```
   */
  normalize(): Vector1 {
    this.x /= this.length();
    return this;
  }

  /**
   * Applies matrix to this vector (mutates this)
   * @param matrix 
   * @returns this instance, for method chaining
   */
  applyMatrix3(matrix: Matrix3): Vector1 {
    const {tmpMatrix3} = Vector1;
    tmpMatrix3.copy(matrix);
    const {x} = tmpMatrix3._applyVector(this.x, 0, 0);
    this.set(x);
    return this;
  }

  /**
   * Applies matrix to this vector (mutates this)
   * @param matrix 
   * @returns this instance, for method chaining
   */
  applyMatrix4(matrix: Matrix4): Vector1 {
    const {tmpMatrix4} = Vector1;
    tmpMatrix4.copy(matrix);
    const {x} = tmpMatrix4._applyVector(this.x, 0, 0, 0);
    this.set(x);
    return this;
  }

  /**
   * Applies quaternion to this vector (mutates this)
   * @param quaternion 
   * @returns this instance, for method chaining
   */
  applyQuaternion(quaternion: Quaternion): Vector1 {
    const {tmpMatrix4} = Vector1;
    tmpMatrix4.setRotation(quaternion);
    const {x} = tmpMatrix4._applyVector(this.x, 0, 0, 0);
    this.set(x);
    return this;
  }
}

export {Vector1};
