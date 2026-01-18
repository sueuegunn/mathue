import type { Vector } from "./Vector";
import type { AdditiveGroup } from "./AdditiveGroup";
import type { Scalable } from "./Scalable";
import type { Normalizable } from "./Normalizable";
import type { Clonable } from "./Clonable";
import { Matrix4 } from "./Matrix4";
import type { Quaternion } from "./Quaternion";

const INDEX_X = 0;
const INDEX_Y = 1;
const INDEX_Z = 2;
const INDEX_W = 3;

class Vector4 implements Vector<4>, AdditiveGroup<Vector4>, Scalable<Vector4>, Normalizable<Vector4>, Clonable<Vector4> {
  /**
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * console.log(v.dimension); // 4
   * ```
   */
  readonly dimension = 4;

  /**
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * console.log(v.elements); // [0, 1, 2, 3]
   * ```
   */
  readonly elements: [number, number, number, number];

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
   * const v = new Vector4(0, 1, 2, 3);
   * ```
   */
  constructor(x: number, y: number, z: number, w: number) {
    this.elements = [x, y, z, w];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * console.log(v.x); // 0
   * ```
   */
  get x(): number {
    return this.elements[INDEX_X];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
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
   * const v = new Vector4(0, 1, 2, 3);
   * console.log(v.y); // 1
   * ```
   */
  get y(): number {
    return this.elements[INDEX_Y];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * v.y = 5;
   * console.log(v.y); // 5
   * ```
   */
  set y(y: number) {
    this.elements[INDEX_Y] = y;
  }

  /**
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * console.log(v.z); // 2
   * ```
   */
  get z(): number {
    return this.elements[INDEX_Z];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * v.z = 5;
   * console.log(v.z); // 5
   * ```
   */
  set z(z: number) {
    this.elements[INDEX_Z] = z;
  }

  /**
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * console.log(v.w); // 3
   * ```
   */
  get w(): number {
    return this.elements[INDEX_W];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * v.w = 5;
   * console.log(v.w); // 5
   * ```
   */
  set w(w: number) {
    this.elements[INDEX_W] = w;
  }

  /**
   * Sets x component (mutate this)
   * @param x 
   * @returns this instance, for method chaining
   */
  setX(x: number): Vector4 {
    this.x = x;
    return this;
  }

  /**
   * Sets y component (mutate this)
   * @param y 
   * @returns this instance, for method chaining
   */
  setY(y: number): Vector4 {
    this.y = y;
    return this;
  }

  /**
   * Sets z component (mutate this)
   * @param z 
   * @returns this instance, for method chaining
   */
  setZ(z: number): Vector4 {
    this.z = z;
    return this;
  }

  /**
   * Sets w component (mutate this)
   * @param w 
   * @returns this instance, for method chaining
   */
  setW(w: number): Vector4 {
    this.w = w;
    return this;
  }

  /**
   * Creates a zero vector instance
   * @returns new zero vector instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const v = Vector4.zero();
   * console.log(v); // (0, 0, 0, 0)
   * ```
   */
  static zero(): Vector4 {
    return new Vector4(0, 0, 0, 0);
  }

  /**
   * Creates all ones vector instance
   * @returns new all ones vector instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const v = Vector4.one();
   * console.log(v); // (1, 1, 1, 1)
   * ```
   */
  static one(): Vector4 {
    return new Vector4(1, 1, 1, 1);
  }

  /**
   * Creates new instance has same elements (pure)
   * @returns new cloned vector instance
   * 
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * const c = v.clone();
   * console.log(c); // (0, 1, 2, 3);
   * ```
   */
  clone(): Vector4 {
    const {x, y, z, w} = this;
    return new Vector4(x, y, z, w);
  }

  /**
   * Determines if this vector is the zero vector (all components are zero)
   * @returns `true` if this vector is exactly zero, `false` otherwise
   * 
   * @example
   * ```ts
   * const zero = Vector4.zero();
   * const ones = Vector4.one();
   * console.log(zero.isZero()); // true
   * console.log(ones.isZero()); // false
   * ```
   */
  isZero(): boolean {
    const {x, y, z, w} = this;
    return x === 0 && y === 0 && z === 0 && w === 0;
  }

  /**
   * Sets all elements (mutates this)
   * @param x 
   * @param y 
   * @param z 
   * @param w
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * v.set(5, 6, 7, 8);
   * console.log(v); // (5, 6, 7, 8)
   * ```
   */
  set(x: number, y: number, z: number, w: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * Copies all elements from other vector (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector4(0, 1, 2, 3);
   * const v2 = new Vector4(5, 6, 7, 8);
   * v1.copy(v2);
   * console.log(v1); // (5, 6, 7, 8)
   * console.log(v2); // (5, 6, 7, 8)
   * ```
   */
  copy(other: Vector4): void {
    const {x, y, z, w} = other;
    this.set(x, y, z, w);
  }

  /**
   * Adds by other vector (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector4(0, 1, 2, 3);
   * const v2 = new Vector4(5, 6, 7, 8);
   * v1.add(v2);
   * console.log(v1); // (5, 7, 9, 11)
   * console.log(v2); // (5, 6, 7, 8)
   * ```
   */
  add(other: Vector4): Vector4 {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    this.w += other.w;
    return this;
  }

  /**
   * Subtracts by other vector (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector4(0, 1, 2, 3);
   * const v2 = new Vector4(5, 6, 7, 8);
   * v1.subtract(v2);
   * console.log(v1); // (-5, -5, -5, -5)
   * console.log(v2); // (5, 6, 7, 8)
   * ```
   */
  subtract(other: Vector4): Vector4 {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    this.w -= other.w;
    return this;
  }

  /**
   * Multiplies all elements by scalar (mutates this)
   * @param scalar 
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * v.multiplyScalar(2);
   * console.log(v); // (0, 2, 4, 6)
   * ```
   */
  multiplyScalar(scalar: number): Vector4 {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;
    return this;
  }

  /**
   * Divides all elements by scalar (mutates this)
   * @param scalar 
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector4(0, 1, 2, 3);
   * v.divideScalar(2);
   * console.log(v); // (0, 0.5, 1, 1.5)
   * ```
   */
  divideScalar(scalar: number): Vector4 {
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;
    this.w /= scalar;
    return this;
  }

  /**
   * Calculates the length of this vector (pure)
   * @returns the length of this vector (always non-negative)
   * 
   * @example
   * ```ts
   * const v = new Vector4(1, 2, 2, 4);
   * console.log(v.length()); // 5
   * ```
   */
  length(): number {
    const {x, y, z, w} = this;
    return Math.sqrt(x ** 2 + y ** 2 + z ** 2 + w ** 2);
  }

  /**
   * Normalizes this vector to length 1 (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector4(1, 2, 2, 4);
   * v.normalize();
   * console.log(v); // (1/5, 2/5, 2/5, 4/5)
   * ```
   */
  normalize(): Vector4 {
    const length = this.length();
    if (length <= 0) {
      return this;
    }
    return this.divideScalar(length);
  }

  /**
   * Applies matrix to this vector (mutates this)
   * @param matrix 
   * @returns this instance, for method chaining
   */
  applyMatrix4(matrix: Matrix4): Vector4 {
    const {tmpMatrix4} = Vector4;
    tmpMatrix4.copy(matrix);
    const {x, y, z, w} = this;
    const tmpVector = tmpMatrix4._applyVector(x, y, z, w);
    this.copy(tmpVector);
    return this;
  }

  /**
   * Applies quaternion to this vector (mutates this)
   * @param quaternion 
   * @returns this instance, for method chaining
   */
  applyQuaternion(quaternion: Quaternion): Vector4 {
    const {tmpMatrix4} = Vector4;
    tmpMatrix4.setRotation(quaternion);
    const {x, y, z, w} = this;
    const tmpVector = tmpMatrix4._applyVector(x, y, z, w);
    this.copy(tmpVector);
    return this;
  }
}

export {Vector4};