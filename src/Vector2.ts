import type { Vector } from "./Vector";
import type { Additive } from "./Additive";
import type { Scalable } from "./Scalable";
import type { Clonable } from "./Clonable";

const INDEX_X = 0;
const INDEX_Y = 1;

class Vector2 implements Vector<2>, Additive<Vector2>, Scalable<Vector2>, Clonable<Vector2> {
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
   * @example
   * ```ts
   * const v = Vector2.allOnes();
   * console.log(v); // (1, 1)
   * ```
   */
  static allOnes(): Vector2 {
    return new Vector2(1, 1);
  }

  /**
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
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.scalarMultiply(2);
   * console.log(v); // (6, 8)
   * ```
   */
  scalarMultiply(scalar: number): Vector2 {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.scalarDivide(2);
   * console.log(v); // (1.5, 2)
   * ```
   */
  scalarDivide(scalar: number): Vector2 {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  /**
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * console.log(v.magnitude()); // 5
   * ```
   */
  magnitude(): number {
    const {x, y} = this;
    return Math.sqrt(x ** 2 + y ** 2);
  }

  /**
   * @example
   * ```ts
   * const v = new Vector2(3, 4);
   * v.normalize();
   * console.log(v); // (0.6, 0.8)
   * ```
   */
  normalize(): Vector2 {
    const length = this.magnitude();
    if (length <= 0) {
      return this;
    }
    return this.scalarDivide(length);
  }

  /**
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
}

export {Vector2};
