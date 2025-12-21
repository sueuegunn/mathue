import type { Vector } from "./Vector";
import type { Additive } from "./Additive";
import type { Scalable } from "./Scalable";
import type { Clonable } from "./Clonable";
import type { Normalizable } from "./Normalizable";

const INDEX_X = 0;

class Vector1 implements Vector<1>, Additive<Vector1>, Scalable<Vector1>, Normalizable<Vector1>, Clonable<Vector1> {
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
   * determines if this vector is the zero vector
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
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector1(2);
   * v.setValue(3);
   * console.log(v.x); // 3
   * ```
   */
  setValue(x: number): Vector1 {
    this.x = x;
    return this;
  }

  /**
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v1 = new Vector1(1);
   * const v2 = new Vector1(2);
   * v1.set(v2);
   * console.log(v1.x); // 2
   * console.log(v2.x); // 2
   * ```
   */
  set(other: Vector1): Vector1 {
    this.x = other.x;
    return this;
  }

  /**
   * @param other
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
   * @param other
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
   * @param scalar
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector1(2);
   * v.scalarMultiply(3);
   * console.log(v.x); // 6
   * ```
   */
  scalarMultiply(scalar: number): Vector1 {
    this.x *= scalar;
    return this;
  }

  /**
   * @param scalar
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector1(6);
   * v.scalarDivide(2);
   * console.log(v.x); // 3
   * ```
   */
  scalarDivide(scalar: number): Vector1 {
    this.x /= scalar;
    return this;
  }

  /**
   * calculates the length of this vector
   * @returns the length of this vector (always non-negative)
   * 
   * @example
   * ```ts
   * const v = new Vector1(2);
   * console.log(v.length()); // 2
   * ```
   */
  length(): number {
    return this.x;
  }

  /**
   * normalizes this vector to length 1
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const v = new Vector1(2);
   * v.normalize();
   * console.log(v.x); // 1
   * ```
   */
  normalize(): Vector1 {
    this.x = 1;
    return this;
  }
}

export {Vector1};
