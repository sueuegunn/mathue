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
const INDEX_Z = 2;

class Vector3 implements Vector<3>, AdditiveGroup<Vector3>, Scalable<Vector3>, Normalizable<Vector3>, Clonable<Vector3> {
  /**
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * console.log(v.dimension); // 3
   * ```
   */
  readonly dimension = 3;

  /**
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * console.log(v.elements); // [4, 5, 6]
   * ```
   */
  readonly elements: [number, number, number];

  private static _tmpMatrix3?: Matrix3;
  private static get tmpMatrix3(): Matrix3 {
    if (!this._tmpMatrix3) {
      this._tmpMatrix3 = Matrix3.identity();
    }
    return this._tmpMatrix3;
  }

  private static _tmpMatrix4?: Matrix4
  private static get tmpMatrix4(): Matrix4 {
    if (!this._tmpMatrix4) {
      this._tmpMatrix4 = Matrix4.identity();
    }
    return this._tmpMatrix4;
  }

  /**
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * ```
   */
  constructor(x: number, y: number, z: number) {
    this.elements = [x, y, z];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * console.log(v.x); // 4
   * ```
   */
  get x(): number {
    return this.elements[INDEX_X];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * v.x = 7;
   * console.log(v.x); // 7
   * ```
   */
  set x(x: number) {
    this.elements[INDEX_X] = x;
  }

  /**
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * console.log(v.y); // 5
   * ```
   */
  get y(): number {
    return this.elements[INDEX_Y];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * v.y = 7;
   * console.log(v.y); // 7
   * ```
   */
  set y(y: number) {
    this.elements[INDEX_Y] = y;
  }

  /**
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * console.log(v.z); // 6
   * ```
   */
  get z(): number {
    return this.elements[INDEX_Z];
  }

  /**
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * v.z = 7;
   * console.log(v.z); // 7
   * ```
   */
  set z(z: number) {
    this.elements[INDEX_Z] = z;
  }

  /**
   * Creates a zero vector instance
   * @returns new zero vector instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const v = Vector3.zero();
   * console.log(v); // (0, 0, 0)
   * ```
   */
  static zero(): Vector3 {
    return new Vector3(0, 0, 0);
  }

  /**
   * Creates all ones vector instance
   * @returns new all ones vector instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const v = Vector3.one();
   * console.log(v); // (1, 1, 1)
   * ```
   * 
   */
  static one(): Vector3 {
    return new Vector3(1, 1, 1);
  }

  /**
   * Creates new instance has same elements (pure)
   * @returns new cloned vector instance
   * 
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * const c = v.clone();
   * console.log(c); // (4, 5, 6)
   * ```
   */
  clone(): Vector3 {
    const {x, y, z} = this;
    return new Vector3(x, y, z);
  }

  /**
   * Determines if this vector is the zero vector (all components are zero)
   * @returns `true` if this vector is exactly zero, `false` otherwise
   * 
   * @example
   * ```ts
   * const zero = Vector3.zero();
   * const ones = Vector3.one();
   * console.log(zero.isZero()); // true
   * console.log(ones.isZero()); // false
   * ```
   */
  isZero(): boolean {
    const {x, y, z} = this;
    return x === 0 && y === 0 && z === 0;
  }

  /**
   * Sets all elements (mutates this)
   * @param x
   * @param y
   * @param z
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * v.set(7, 8, 9);
   * console.log(v); // (7, 8, 9)
   * ```
   */
  set(x: number, y: number, z: number): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Copies all elements from other vector (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector3(4, 5, 6);
   * const v2 = new Vector3(7, 8, 9);
   * v1.copy(v2);
   * console.log(v1); // (7, 8, 9)
   * console.log(v2); // (7, 8, 9)
   * ```
   */
  copy(other: Vector3): Vector3 {
    const {x, y, z} = other;
    return this.set(x, y, z);
  }

  /**
   * Adds by other vector (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector3(4, 5, 6);
   * const v2 = new Vector3(7, 8, 9);
   * v1.add(v2);
   * console.log(v1); // (11, 13, 15)
   * console.log(v2); // (7, 8, 9)
   * ```
   */
  add(other: Vector3): Vector3 {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }

  /**
   * Subtracts by other vector (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector3(4, 5, 6);
   * const v2 = new Vector3(7, 8, 9);
   * v1.subtract(v2);
   * console.log(v1); // (-3, -3, -3)
   * console.log(v2); // (7, 8, 9)
   * ```
   */
  subtract(other: Vector3): Vector3 {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }

  /**
   * Multiplies all elements by scalar (mutates this)
   * @param scalar 
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * v.multiplyScalar(2);
   * console.log(v); // (8, 10, 12)
   * ```
   */
  multiplyScalar(scalar: number): Vector3 {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  /**
   * Divides all elements by scalar (mutates this)
   * @param scalar 
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * v.divideScalar(2);
   * console.log(v); // (2, 2.5, 3)
   * ```
   */
  divideScalar(scalar: number): Vector3 {
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;
    return this;
  }

  /**
   * Calculates the length of this vector (pure)
   * @returns the length of this vector (always non-negative)
   * 
   * @example
   * ```ts
   * const v = new Vector3(2, 3, 6);
   * console.log(v.length()); // 7
   * ```
   */
  length(): number {
    const {x, y, z} = this;
    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  /**
   * Normalizes this vector to length 1 (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector3(2, 3, 6);
   * v.normalize();
   * console.log(v); // (2/7, 3/7, 6/7)
   * ```
   */
  normalize(): Vector3 {
    const length = this.length();
    if (length <= 0) {
      return this;
    }
    return this.divideScalar(length);
  }

  /**
   * Calculates the cross product of this and other (mutates this)
   * @param other other vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector3(1, 0, 0);
   * const v2 = Vector3.zero();
   * v1.cross(v2);
   * console.log(v1); // (0, 0, 1);
   * 
   * const v3 = new Vector3(1, 0, 0);
   * const v4 = Vector3.zero();
   * const out = Vector3.zero();
   * v3.cross(v4, out);
   * console.log(v3); // (1, 0, 0)
   * console.log(out); // (0, 0, 1)
   * ``` 
   */
  cross(other: Vector3): Vector3 {
    const {x: tx, y: ty, z: tz} = this;
    const {x: ox, y: oy, z: oz} = other;
    const x = ty * oz - tz * oy;
    const y = tz * ox - tx * oz;
    const z = tx * oy - ty * ox;
    return this.set(x, y, z);
  }

  /**
   * Calculates the cross product of this and other (mutates out)
   * @param other other vector
   * @param out vector instance to receive cross
   * @returns 
   */
  crossTo(other: Vector3, out: Vector3): Vector3 {
    out.copy(this);
    return out.cross(other);
  }

  /**
   * Applies matrix to this vector (mutates this)
   * @param matrix 
   * @returns this instance, for method chaining
   */
  applyMatrix3(matrix: Matrix3): Vector3 {
    const {tmpMatrix3} = Vector3;
    tmpMatrix3.copy(matrix);
    const {x, y, z} = tmpMatrix3._applyVector(this.x, this.y, this.z);
    this.set(x, y, z);
    return this;
  }

  /**
   * Applies matrix to this vector (mutates this)
   * @param matrix 
   * @returns this instance, for method chaining
   */
  applyMatrix4(matrix: Matrix4): Vector3 {
    const {tmpMatrix4: tmpMatrix} = Vector3;
    tmpMatrix.copy(matrix);
    const {x, y, z} = tmpMatrix._applyVector(this.x, this.y, this.z, 0);
    this.set(x, y, z);
    return this;
  }

  /**
   * Applies quaternion to this vector (mutates this)
   * @param quaternion 
   * @returns this instance, for method chaining
   */
  applyQuaternion(quaternion: Quaternion): Vector3 {
    const {tmpMatrix4: tmpMatrix} = Vector3;
    tmpMatrix.setRotation(quaternion);
    const {x, y, z} = tmpMatrix._applyVector(this.x, this.y, this.z, 0);
    this.set(x, y, z);
    return this;
  }
}

export {Vector3};
