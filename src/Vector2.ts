import type { Vector } from "./Vector";
import type { AdditiveGroup } from "./AdditiveGroup";
import type { Scalable } from "./Scalable";
import type { Normalizable } from "./Normalizable";
import type { Clonable } from "./Clonable";
import { Matrix4 } from "./Matrix4";
import type { Quaternion } from "./Quaternion";
import { Matrix3 } from "./Matrix3";

const INDEX_X = 0;
const INDEX_Y = 1;

class Vector2 implements Vector<2>, AdditiveGroup<Vector2>, Scalable<Vector2>, Normalizable<Vector2>, Clonable<Vector2> {
  /**
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * console.log(v.dimension); // 2
   * ```
   */
  readonly dimension = 2;

  /**
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * console.log(v.elements); // [3, 4]
   * ```
   */
  readonly elements: [number, number];

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
   * const v = new Vector2(3, 4);
   * ```
   */
  constructor(x: number, y: number) {
    this.elements = [x, y];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * console.log(v.x); // 3
   * ```
   */
  get x(): number {
    return this.elements[INDEX_X];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.x = 5;
   * console.log(v.x); // 5
   * ```
   */
  set x(x: number) {
    this.elements[INDEX_X] = x;
  }

  /**
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * console.log(v.y); // 4
   * ```
   */
  get y(): number {
    return this.elements[INDEX_Y];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.y = 5;
   * console.log(v.y); // 5
   * ```
   */
  set y(y: number) {
    this.elements[INDEX_Y] = y;
  }

  /**
   * Creates a zero vector instance
   * @returns new zero vector instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const v = Vector2.zero();
   * console.log(v); // (0, 0)
   * ```
   */
  static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  /**
   * Creates all ones vector instance
   * @returns new all ones vector instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const v = Vector2.one();
   * console.log(v); // (1, 1)
   * ```
   */
  static one(): Vector2 {
    return new Vector2(1, 1);
  }

  /**
   * Creates new instance has same elements (pure)
   * @returns new cloned vector instance
   * 
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * const c = v.clone();
   * console.log(c); // (3, 4)
   * ```
   */
  clone(): Vector2 {
    const {x, y} = this;
    return new Vector2(x, y);
  }

  /**
   * Determines if this vector is the zero vector (all components are zero)
   * @returns `true` if this vector is exactly zero, `false` otherwise
   * 
   * @example
   * ```ts
   * const zero = Vector2.zero();
   * const ones = Vector2.one();
   * console.log(zero.isZero()); // true
   * console.log(ones.isZero()); // false
   */
  isZero(): boolean {
    const {x, y} = this;
    return x === 0 && y === 0;
  }

  /**
   * Sets all elements (mutates this)
   * @param x
   * @param y
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.set(5, 6);
   * console.log(v); // (5, 6)
   * ```
   */
  set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Copies all elements from other vector (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector2(3, 4);
   * const v2 = new Vector2(5, 6);
   * v1.copy(v2);
   * console.log(v1); // (5, 6)
   * console.log(v2); // (5, 6)
   * ```
   */
  copy(other: Vector2): Vector2 {
    const {x, y} = other;
    return this.set(x, y);
  }

  /**
   * Adds by other vector (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector2(3, 4);
   * const v2 = new Vector2(5, 6);
   * v1.add(v2);
   * console.log(v1); // (8, 10)
   * console.log(v2); // (5, 6)
   * ```
   */
  add(other: Vector2): Vector2 {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  /**
   * Subtracts by other vector (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector2(3, 4);
   * const v2 = new Vector2(5, 6);
   * v1.subtract(v2);
   * console.log(v1); // (-2, -2)
   * console.log(v2); // (5, 6)
   * ```
   */
  subtract(other: Vector2): Vector2 {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  /**
   * Multiplies all elements by scalar (mutates this)
   * @param scalar
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.multiplyScalar(2);
   * console.log(v); // (6, 8)
   * ```
   */
  multiplyScalar(scalar: number): Vector2 {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * Divides all elements by scalar (mutates this)
   * @param scalar
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.divideScalar(2);
   * console.log(v); // (1.5, 2)
   * ```
   */
  divideScalar(scalar: number): Vector2 {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  /**
   * Calculates the length of this vector (pure)
   * @returns the length of this vector (always non-negative)
   * 
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * console.log(v.length()); // 5
   * ```
   */
  length(): number {
    const {x, y} = this;
    return Math.sqrt(x ** 2 + y ** 2);
  }

  /**
   * Normalizes this vector to length 1 (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.normalize();
   * console.log(v); // (0.6, 0.8)
   * ```
   */
  normalize(): Vector2 {
    const length = this.length();
    if (length <= 0) {
      return this;
    }
    return this.divideScalar(length);
  }

  /**
   * Rotates vector by given angle in radians (mutates this)
   * @param radian angle in radians, measured counter-clockwise from the positive x-axis
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector2(1, 1);
   * v.rotate(Math.PI / 2);
   * console.log(v); // (-1, 1)
   * ```
   */
  rotate(radian: number): Vector2 {
    const {cos, sin} = Math;
    const x = this.x * cos(radian) - this.y * sin(radian);
    const y = this.x * sin(radian) + this.y * cos(radian);
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Applies matrix to this vector (mutates this)
   * @param matrix 
   * @returns this instance, for method chaining
   */
  applyMatrix3(matrix: Matrix3): Vector2 {
    const {tmpMatrix3} = Vector2;
    tmpMatrix3.copy(matrix);
    const {x, y} = tmpMatrix3._applyVector(this.x, this.y, 0);
    this.set(x, y);
    return this;
  }

  /**
   * Applies matrix to this vector (mutates this)
   * @param matrix 
   * @returns this instance, for method chaining
   */
  applyMatrix4(matrix: Matrix4): Vector2 {
    const {tmpMatrix4} = Vector2;
    tmpMatrix4.copy(matrix);
    const {x, y} = tmpMatrix4._applyVector(this.x, this.y, 0, 0);
    this.set(x, y);
    return this;
  }

  /**
   * Applies quaternion to this vector (mutates this)
   * @param quaternion 
   * @returns this instance, for method chaining
   */
  applyQuaternion(quaternion: Quaternion): Vector2 {
    const {tmpMatrix4} = Vector2;
    tmpMatrix4.setQuaternion(quaternion);
    const {x, y} = tmpMatrix4._applyVector(this.x, this.y, 0, 0);
    this.set(x, y);
    return this;
  }
}

export {Vector2};
