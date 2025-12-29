import type { Vector } from "./Vector";
import type { AdditiveGroup } from "./AdditiveGroup";
import type { Scalable } from "./Scalable";
import type { Normalizable } from "./Normalizable";
import type { Clonable } from "./Clonable";
import { Matrix4 } from "./Matrix4";
import type { Quaternion } from "./Quaternion";

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

  private static _tmpMatrix?: Matrix4;
  private static get tmpMatrix(): Matrix4 {
    if (!this._tmpMatrix) {
      this._tmpMatrix = Matrix4.identity();
    }
    return this._tmpMatrix;
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
   * determines if this vector is the zero vector (all components are zero)
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
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.setValues(5, 6);
   * console.log(v); // (5, 6)
   * ```
   */
  setValues(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector2(3, 4);
   * const v2 = new Vector2(5, 6);
   * v1.set(v2);
   * console.log(v1); // (5, 6)
   * console.log(v2); // (5, 6)
   * ```
   */
  set(other: Vector2): Vector2 {
    const {x, y} = other;
    return this.setValues(x, y);
  }

  /**
   * @param other
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
   * @param other
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
   * @param scalar
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.scalarMultiply(2);
   * console.log(v); // (6, 8)
   * ```
   */
  multiplyScalar(scalar: number): Vector2 {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
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
   * calculates the length of this vector
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
   * normalizes this vector to length 1
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
   * rotate vector by given angle (in radians)
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

  applyMatrix4(matrix: Matrix4): Vector2 {
    const {tmpMatrix} = Vector2;
    tmpMatrix.set(matrix);
    const {x, y} = tmpMatrix._applyVector(this.x, this.y, 0, 0);
    this.setValues(x, y);
    return this;
  }

  applyQuaternion(quaternion: Quaternion): Vector2 {
    const {tmpMatrix} = Vector2;
    tmpMatrix.setQuaternion(quaternion);
    const {x, y} = tmpMatrix._applyVector(this.x, this.y, 0, 0);
    this.setValues(x, y);
    return this;
  }
}

export {Vector2};
