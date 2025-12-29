import type { AdditiveGroup } from "./AdditiveGroup";
import type { PartialMultiplicativeGroup } from "./PartialMultiplicativeGroup";
import type { Scalable } from "./Scalable";
import type { Clonable } from "./Clonable";
import { Vector3 } from "./Vector3";

/**
 * Represents a quaternion using Hamilton's notation: q = a + bi + cj + dk
 */
class Quaternion implements AdditiveGroup<Quaternion>, PartialMultiplicativeGroup<Quaternion>, Scalable<Quaternion>, Clonable<Quaternion> {
  private _a: number;
  private _b: number;
  private _c: number;
  private _d: number;

  private static temporary = Quaternion.identity();

   /**
   * Constructor of quaternion: q = a + bi + cj + dk
   * @param a the first real component
   * @param b the i-coefficient
   * @param c the j-coefficient
   * @param d the k-coefficient
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 0, 0, 0);
   * ```
   */
  constructor(a: number, b: number, c: number, d: number) {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
  }

  /**
   * Gets the first real component of this quaternion
   * @readonly
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 3, 4);
   * console.log(q.a); // 1
   * ```
   */
  get a(): number {
    return this._a;
  }

   /**
   * Gets the i-coefficient of this quaternion
   * @readonly
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 3, 4);
   * console.log(q.b); // 2
   * ```
   */
  get b(): number {
    return this._b;
  }

   /**
   * Gets the j-coefficient of this quaternion
   * @readonly
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 3, 4);
   * console.log(q.c); // 3
   * ```
   */
  get c(): number {
    return this._c;
  }

  /**
   * Gets the k-coefficient of this quaternion
   * @readonly
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 3, 4);
   * console.log(q.d); // 4
   * ```
   */
  get d(): number {
    return this._d;
  }

  /**
   * @returns new identity quaternion instance
   * 
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const q = Quaternion.identity();
   * console.log(q); // (1, 0, 0, 0)
   * ```
   */
  static identity(): Quaternion {
    return new Quaternion(1, 0, 0, 0);
  }

  /**
   * @param axis the rotation axis
   * @param angle the rotation angle in radians
   * @returns new normalized quaternion instance from axis and radian
   * 
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const axis = new Vector3(0, 1, 0);
   * const radian = Math.PI / 3;
   * const q = Quaternion.identity(axis, radian);
   * ```
   */
  static fromAxisAndAngle(axis: Vector3, angle: number): Quaternion {
    const quaternion = Quaternion.identity();
    quaternion.setAxisAndAngle(axis, angle);
    return quaternion;
  }

  /**
   * @returns new cloned quaternion instance
   * 
   * @example
   * ```ts
   * const q = Quaternion.identity();
   * const c = q.clone();
   * console.log(c); // (1, 0, 0, 0)
   * ```
   */
  clone(): Quaternion {
    const {a, b, c, d} = this;
    return new Quaternion(a, b, c, d);
  }

  /**
   * Sets all components of this quaternion: q = a + bi + cj + dk (mutates this)
   * @param a the first real component
   * @param b the i-coefficient
   * @param c the j-coefficient
   * @param d the k-coefficient
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = Quaternion.identity();
   * console.log(q); // (1, 0, 0, 0)
   * q.setValues(0, 0, 0, 1);
   * console.log(q); // (0, 0, 0, 1)
   * ```
   */
  setValues(a: number, b: number, c: number, d: number): Quaternion {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
    return this;
  }

  /**
   * Sets this quaternion to other quaternion (mutates this)
   * @param other the other quaternion
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q1 = new Quaternion(1, 2, 3, 4);
   * const q2 = new Quaternion(5, 6, 7, 8);
   * q1.set(q2);
   * console.log(q1); // (5, 6, 7, 8)
   * console.log(q2); // (5, 6, 7, 8)
   * ```
   */
  set(other: Quaternion): Quaternion {
    const {a, b, c, d} = other;
    return this.setValues(a, b, c, d);
  }

  /**
   * Sets this instance to identity quaternion (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 3, 4);
   * q.setIdentity();
   * console.log(q); // (1, 0, 0, 0)
   * ```
   */
  setIdentity(): void {
    this.setValues(1, 0, 0, 0);
  }

  /**
   * Sets this quaternion from axis and radian (mutates this)
   * @param axis the rotation axis
   * @param angle the rotation angle in radians
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = Quaternion.identity();
   * const axis = new Vector3(0, 1, 0);
   * const radian = Math.PI / 3;
   * q.setAxisAndAngle(axis, radian);
   * ```
   */

  setAxisAndAngle(axis: Vector3, angle: number): void {
    if (axis.isZero()) {
      return this.setIdentity();
    }

    axis.normalize();
    const {x, y, z} = axis;
    const sin = Math.sin(angle / 2);
    this.setValues(Math.cos(angle / 2), x * sin, y * sin, z * sin);
  }

  /**
   * Calculates squared norm of this quaternion (pure)
   * @returns squared norm of this quaternion
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 2, 4);
   * console.log(q.squaredNorm()); // 25
   * ```
   */
  squaredNorm(): number {
    const {a, b, c, d} = this;
    return a ** 2 + b ** 2 + c ** 2 + d ** 2;
  }

  /**
   * Calculates norm of this quaternion (pure)
   * @returns norm of this quaternion
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 2, 4);
   * console.log(q.norm()); // 5
   * ```
   */
  norm(): number {
    return Math.sqrt(this.squaredNorm());
  }

  /**
   * Calculates conjugate of this quaternion (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 3, 4);
   * q.conjugate();
   * console.log(q); // (1, -2, -3, -4)
   * ```
   */
  conjugate(): Quaternion {
    this._b *= -1;
    this._c *= -1;
    this._d *= -1;
    return this;
  }

  /**
   * Adds other quaternion to this instance (mutates this)
   * @param other other quaternion
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q1 = new Quaternion(1, 2, 3, 4);
   * const q2 = new Quaternion(5, 6, 7, 8);
   * q1.add(q2);
   * console.log(q1); // (6, 8, 10, 12)
   * console.log(q2); // (5, 6, 7, 8)
   * ```
   */
  add(other: Quaternion): Quaternion {
    const {a, b, c, d} = other;
    this._a += a;
    this._b += b;
    this._c += c;
    this._d += d;
    return this;
  }

  /**
   * Subtracts other quaternion from this instance (mutates this)
   * @param other other quaternion
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q1 = new Quaternion(5, 6, 7, 8);
   * const q2 = new Quaternion(1, 2, 3, 4);
   * q1.subtract(q2);
   * console.log(q1); // (4, 4, 4, 4)
   * console.log(q2); // (1, 2, 3, 4)
   * ```
   */
  subtract(other: Quaternion): Quaternion {
    const {a, b, c, d} = other;
    this._a -= a;
    this._b -= b;
    this._c -= c;
    this._d -= d;
    return this;
  }

  /**
   * Multiplies this instance by other quaternion (mutates this)
   * @param other other quaternion
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q1 = new Quaternion(1, 2, 3, 4);
   * const q2 = new Quaternion(5, 6, 7, 8);
   * q1.multiply(q2);
   * console.log(q1); // (-60, 12, 30, 24)
   * console.log(q2); // (5, 6, 7, 8)
   * ```
   */
  multiply(other: Quaternion): Quaternion {
    const {a: ta, b: tb, c: tc, d: td} = this;
    const {a: oa, b: ob, c: oc, d: od} = other;
    this._a = ta * oa - tb * ob - tc * oc - td * od;
    this._b = ta * ob + tb * oa + tc * od - td * oc;
    this._c = ta * oc - tb * od + tc * oa + td * ob;
    this._d = ta * od + tb * oc - tc * ob + td * oa;
    return this;
  }

  /**
   * Calculates inverse of this quaternion (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 3, 4);
   * q.inverse();
   * console.log(q); // (0.0333, -0.0667, -0.1, -0.1333)
   * ```
   */
  invert(): Quaternion | null {
    const norm2 = this.squaredNorm();
    if (norm2 <= 0) {
      return null;
    }
    return this.conjugate().divideScalar(norm2);
  }

  /**
   * Divides this instance by other quaternion (mutates this)
   * @param other other quaternion
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q1 = new Quaternion(1, 2, 3, 4);
   * const q2 = new Quaternion(5, 6, 7, 8);
   * q1.divide(q2);
   * console.log(q1); // (0.1333, 0.0667, 0.1, 0.1333)
   * console.log(q2); // (5, 6, 7, 8)
   * ```
   */
  divide(other: Quaternion): Quaternion | null {
    const {temporary} = Quaternion;
    temporary.set(other);
    if (!temporary.invert()) {
      return null;
    }
    return this.multiply(temporary);
  }

  /**
   * Multiplies this quaternion by a scalar (mutates this)
   * @param scalar scalar value
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = new Quaternion(1, 2, 3, 4);
   * q.scalarMultiply(2);
   * console.log(q); // (2, 4, 6, 8)
   * ```
   */
  multiplyScalar(scalar: number): Quaternion {
    this._a *= scalar;
    this._b *= scalar;
    this._c *= scalar;
    this._d *= scalar;
    return this;
  }

  /**
   * Divides this quaternion by a scalar (mutates this)
   * @param scalar scalar value
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = new Quaternion(2, 4, 6, 8);
   * q.divideScalar(2);
   * console.log(q); // (1, 2, 3, 4)
   * ```
   */
  divideScalar(scalar: number): Quaternion {
    this._a /= scalar;
    this._b /= scalar;
    this._c /= scalar;
    this._d /= scalar;
    return this;
  }

  /**
   * Rotates this quaternion around X axis by given radian (mutates this)
   * @param radian the rotation angle in radians
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = Quaternion.identity();
   * q.rotateX(Math.PI / 2);
   * console.log(q); // (0.7071, 0.7071, 0, 0)
   * ```
   */
  rotateX(radian: number): Quaternion {
    const {temporary} = Quaternion;
    temporary.setIdentity();
    temporary.setAxisAndAngle(new Vector3(1, 0, 0), radian);
    return this.multiply(temporary);
  }

  /**
   * Rotates this quaternion around Y axis by given radian (mutates this)
   * @param radian the rotation angle in radians
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = Quaternion.identity();
   * q.rotateY(Math.PI / 2);
   * console.log(q); // (0.7071, 0, 0.7071, 0)
   * ```
   */
  rotateY(radian: number): Quaternion {
    const {temporary} = Quaternion;
    temporary.setIdentity();
    temporary.setAxisAndAngle(new Vector3(0, 1, 0), radian);
    return this.multiply(temporary);
  }

  /**
   * Rotates this quaternion around Z axis by given radian (mutates this)
   * @param radian the rotation angle in radians 
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const q = Quaternion.identity();
   * q.rotateZ(Math.PI / 2);
   * console.log(q); // (0.7071, 0, 0, 0.7071)
   * ```
   */
  rotateZ(radian: number): Quaternion {
    const {temporary} = Quaternion;
    temporary.setIdentity();
    temporary.setAxisAndAngle(new Vector3(0, 0, 1), radian);
    return this.multiply(temporary);
  }
}

export {Quaternion};
