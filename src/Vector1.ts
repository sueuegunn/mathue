import type { Vector } from "./Vector";
import type { Additive } from "./Additive";
import type { Scalable } from "./Scalable";
import type { Clonable } from "./Clonable";

const INDEX_X = 0;

class Vector1 implements Vector<1>, Additive<Vector1>, Scalable<Vector1>, Clonable<Vector1> {
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
}

export {Vector1};
