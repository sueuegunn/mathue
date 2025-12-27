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

  private static _tmpMatrix?: Matrix4
  private static get tmpMatrix(): Matrix4 {
    if (!this._tmpMatrix) {
      this._tmpMatrix = Matrix4.identity();
    }
    return this._tmpMatrix;
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
   * @returns new all ones vector instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const v = Vector3.allOnes();
   * console.log(v); // (1, 1, 1)
   * ```
   * 
   */
  static allOnes(): Vector3 {
    return new Vector3(1, 1, 1);
  }

  /**
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
   * determines if this vector is the zero vector (all components are zero)
   * @returns `true` if this vector is exactly zero, `false` otherwise
   * 
   * @example
   * ```ts
   * const zero = Vector3.zero();
   * const ones = Vector3.allOnes();
   * console.log(zero.isZero()); // true
   * console.log(ones.isZero()); // false
   * ```
   */
  isZero(): boolean {
    const {x, y, z} = this;
    return x === 0 && y === 0 && z === 0;
  }

  /**
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector3(4, 5, 6);
   * v.setValues(7, 8, 9);
   * console.log(v); // (7, 8, 9)
   * ```
   */
  setValues(x: number, y: number, z: number): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector3(4, 5, 6);
   * const v2 = new Vector3(7, 8, 9);
   * v1.set(v2);
   * console.log(v1); // (7, 8, 9)
   * console.log(v2); // (7, 8, 9)
   * ```
   */
  set(other: Vector3): Vector3 {
    const {x, y, z} = other;
    return this.setValues(x, y, z);
  }

  /**
   * @param other 
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
   * @param other 
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
   * calculates the length of this vector
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
   * normalizes this vector to length 1
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
   * calculates the cross product of this and other (mutates this)
   * @param other 
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
    return this.setValues(x, y, z);
  }

  crossTo(other: Vector3, out: Vector3): Vector3 {
    out.set(this);
    return out.cross(other);
  }

  applyMatrix4(matrix: Matrix4): Vector3 {
    const {tmpMatrix} = Vector3;
    tmpMatrix.set(matrix);
    const {x, y, z} = tmpMatrix._applyVector(this.x, this.y, this.z, 0);
    this.setValues(x, y, z);
    return this;
  }

  applyQuaternion(quaternion: Quaternion): Vector3 {
    const {tmpMatrix} = Vector3;
    tmpMatrix.setQuaternion(quaternion);
    const {x, y, z} = tmpMatrix._applyVector(this.x, this.y, this.z, 0);
    this.setValues(x, y, z);
    return this;
  }
}

export {Vector3};
