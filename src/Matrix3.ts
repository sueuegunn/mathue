import type { AdditiveGroup } from "./AdditiveGroup";
import type { Clonable } from "./Clonable";
import { range } from "./functions";
import type { Matrix } from "./Matrix";
import type { PartialMultiplicativeGroup } from "./PartialMultiplicativeGroup";
import type { Scalable } from "./Scalable";
import { Vector3 } from "./Vector3";

const EPSILON = 1.0e-8;

class Matrix3 implements Matrix<3>, AdditiveGroup<Matrix3>, PartialMultiplicativeGroup<Matrix3>, Scalable<Matrix3>, Clonable<Matrix3> {
  /**
   * @example
   * ```ts
   * const m = Matrix3.identity();
   * console.log(m.order); // 3
   * ```
   */
  readonly order = 3;

  /**
   * @example
   * ```ts
   * const m = Matrix3.identity();
   * console.log(m.elements);
   * // [ 1, 0, 0,
   * //   0, 1, 0,
   * //   0, 0, 1 ]
   * ```
   */
  readonly elements: Float32Array;

  private static _tmpMatrix?: Matrix3;
  private static get tmpMatrix(): Matrix3 {
    if (!this._tmpMatrix) {
      this._tmpMatrix = Matrix3.identity();
    }
    return this._tmpMatrix;
  }

  private static _tmpVector?: Vector3;
  private static get tmpVector(): Vector3 {
    if (!this._tmpVector) {
      this._tmpVector = Vector3.zero();
    }
    return this._tmpVector;
  }

  /**
   * Creates a new 3x3 matrix with the specified elements. \
   * The internal data is stored in **column-major** order in a `Float32Array`.
   * 
   * The parameters `e(column)(row)` correspond to this following matrix positions: \
   * ```
   * | e00 e10 e20 |
   * | e01 e11 e21 |
   * | e02 e12 e22 |
   * ```
   * 
   * The `elements` array stores each column sequentialy: \
   * `[e00, e01, e02, e10, e11, e12, e20, e21, e22]`
   * 
   * @param e00 element in column 0, row 0
   * @param e01 element in column 0, row 1
   * @param e02 element in column 0, row 2
   * @param e10 element in column 1, row 0
   * @param e11 element in column 1, row 1
   * @param e12 element in column 1, row 2
   * @param e20 element in column 2, row 0
   * @param e21 element in column 2, row 1
   * @param e22 element in column 2, row 2
   * 
   * @example
   * ```ts
   * const m = new Matrix3(0, 1, 2, 3, 4, 5, 6, 7, 8);
   * console.log(m.elements);
   * // [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
   * ```
   */
  constructor(
    e00: number,
    e01: number,
    e02: number,
    e10: number,
    e11: number,
    e12: number,
    e20: number,
    e21: number,
    e22: number
  ) {
    this.elements = Float32Array.of(e00, e01, e02, e10, e11, e12, e20, e21, e22);
  }

  /**
   * Creates a identity matrix instance
   * @returns new identity matrix instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const m = Matrix3.identity();
   * console.log(m.elements);
   * // [ 1, 0, 0,
   * //   0, 1, 0,
   * //   0, 0, 1 ]
   * ```
   */
  static identity(): Matrix3 {
    const matrix = Matrix3.zero();
    return matrix.setIdentity();
  }

  /**
   * Creates a new zero matrix instance
   * @returns new zero matrix instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const m = Matrix3.zero();
   * console.log(m.elements);
   * // [ 0, 0, 0,
   * //   0, 0, 0,
   * //   0, 0, 0 ]
   * ```
   */
  static zero(): Matrix3 {
    return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  /**
   * Creates new instance has same elements (pure)
   * @returns new cloned matrix instance
   * 
   * @example
   * ```ts
   * const m = Matrix3.identity();
   * const c = m.clone();
   * console.log(c.elements);
   * // [ 1, 0, 0,
   * //   0, 1, 0,
   * //   0, 0, 1 ]
   * ```
   */
  clone(): Matrix3 {
    const [e00, e01, e02, e10, e11, e12, e20, e21, e22] = this.elements;
    return new Matrix3(e00, e01, e02, e10, e11, e12, e20, e21, e22);
  }

  /**
   * Sets all elements (mutates this)
   * @param e00 element in column 0, row 0
   * @param e01 element in column 0, row 1
   * @param e02 element in column 0, row 2
   * @param e10 element in column 1, row 0
   * @param e11 element in column 1, row 1
   * @param e12 element in column 1, row 2
   * @param e20 element in column 2, row 0
   * @param e21 element in column 2, row 1
   * @param e22 element in column 2, row 2
   * @returns this instance, for method chaining
   * 
   * @example
   * const m = Matrix3.zero();
   * m.set(0, 1, 2, 3, 4, 5, 6, 7, 8);
   * console.log(m.elements);
   * // [ 0, 1, 2,
   * //   3, 4, 5,
   * //   6, 7, 8 ]
   */
  set(
    e00: number,
    e01: number,
    e02: number,
    e10: number,
    e11: number,
    e12: number,
    e20: number,
    e21: number,
    e22: number
  ): Matrix3 {
    this.elements[0] = e00;
    this.elements[1] = e01;
    this.elements[2] = e02;
    this.elements[3] = e10;
    this.elements[4] = e11;
    this.elements[5] = e12;
    this.elements[6] = e20;
    this.elements[7] = e21;
    this.elements[8] = e22;
    return this;
  }

  /**
   * Copies all elements from other matrix (mutates this)
   * @param other other matrix
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix3.zero();
   * const i = Matrix3.identity();
   * m.set(i);
   * console.log(m.elements);
   * // [ 1, 0, 0,
   * //   0, 1, 0,
   * //   0, 0, 1 ]
   * ```
   */
  copy(other: Matrix3): void {
    const [e00, e01, e02, e10, e11, e12, e20, e21, e22] = other.elements;
    this.set(e00, e01, e02, e10, e11, e12, e20, e21, e22);
  }

  /**
   * Sets identity matrix (mutates this)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.zero();
   * m.setIdentity();
   * console.log(m.elements);
   * // [ 1, 0, 0,
   * //   0, 1, 0,
   * //   0, 0, 1 ]
   * ```
   */
  setIdentity(): Matrix3 {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    return this;
  }

  /**
   * Adds by other matrix (mutates this)
   * @param other other matrix
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m1 = Matrix3.zero();
   * const m2 = Matrix3.identity();
   * m1.add(m2);
   * console.log(m1.elements);
   * // [ 1, 0, 0,
   * //   0, 1, 0,
   * //   0, 0, 1 ]
   * ```
   */
  add(other: Matrix3): Matrix3 {
    const {order} = this;
    for (const index of range(order ** 2)) {
      this.elements[index] += other.elements[index];
    }
    return this;
  }

  /**
   * Subtracts by other matrix (mutates this)
   * @param other other matrix
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m1 = Matrix3.zero();
   * const m2 = Matrix3.identity();
   * m1.subtract(m2);
   * console.log(m1.lements);
   * // [ -1,  0,  0,
   * //    0, -1,  0,
   * //    0,  0, -1 ]
   * ```
   */
  subtract(other: Matrix3): Matrix3 {
    const {order} = this;
    for (const index of range(order ** 2)) {
      this.elements[index] -= other.elements[index];
    }
    return this;
  }

  /**
   * Multiplies all elements by scalar (mutates this)
   * @param scalar 
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix3.identity();
   * m.scalarMultiply(2);
   * console.log(m.elements);
   * // [ 2, 0, 0,
   * //   0, 2, 0,
   * //   0, 0, 2 ]
   * ```
   */
  multiplyScalar(scalar: number): Matrix3 {
    const {order} = this;
    for (const index of range(order ** 2)) {
      this.elements[index] *= scalar;
    }
    return this;
  }

  /**
   * Divides all elements by scalar (mutates this)
   * @param scalar 
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix3.identity();
   * m.divideScalar(2);
   * console.log(m.elements);
   * // [ 0.5,   0,   0,
   * //     0, 0.5,   0,
   * //     0,   0, 0.5 ]
   * ```
   */
  divideScalar(scalar: number): Matrix3 {
    const {order} = this;
    for (const index of range(order ** 2)) {
      this.elements[index] /= scalar;
    }
    return this;
  }

  /**
   * Multiplies this matrix by other matrix (mutates this)
   * @param other other matrix
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m1 = Matrix3.identity();
   * const m2 = Matrix3.zero();
   * m1.multiply(m2);
   * console.log(m.elements);
   * // [ 0, 0, 0,
   * //   0, 0, 0,
   * //   0, 0, 0 ]
   * ```
   */
  multiply(other: Matrix3): Matrix3 {
    const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = this.elements;
    const [b00, b01, b02, b10, b11, b12, b20, b21, b22] = other.elements;
    this.elements[0] = b00 * a00 + b01 * a10 + b02 * a20;
    this.elements[1] = b00 * a01 + b01 * a11 + b02 * a21;
    this.elements[2] = b00 * a02 + b01 * a12 + b02 * a22;
    this.elements[3] = b10 * a00 + b11 * a10 + b12 * a20;
    this.elements[4] = b10 * a01 + b11 * a11 + b12 * a21;
    this.elements[5] = b10 * a02 + b11 * a12 + b12 * a22;
    this.elements[6] = b20 * a00 + b21 * a10 + b22 * a20;
    this.elements[7] = b20 * a01 + b21 * a11 + b22 * a21;
    this.elements[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return this;
  }

  /**
   * Calculates determinant of this matrix (pure)
   * @returns determinant of this matrix
   */
  determinant(): number {
    const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = this.elements;
    return (
      a00 * (a22 * a11 - a12 * a21) +
      a01 * (-a22 * a10 + a12 * a20) +
      a02 * (a21 * a10 - a11 * a20)
    );
  }

  /**
   * Sets inverse of this matrix to this instance (mutates this)
   * @returns `this` instance for method chaining if this is invertible, `null` otherwise
   */
  invert(): Matrix3 | null {
    const determinant = this.determinant();
    if (Math.abs(determinant) < EPSILON) {
      return null;
    }

    const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = this.elements;
    const tmp0 = a22 * a11 - a12 * a21;
    const tmp1 = -a22 * a10 + a12 * a20;
    const tmp2 = a21 * a10 - a11 * a20;
    this.elements[0] = tmp0 / determinant;
    this.elements[1] = (-a22 * a01 + a02 * a21) / determinant;
    this.elements[2] = (a12 * a01 - a02 * a11) / determinant;
    this.elements[3] = tmp1 / determinant;
    this.elements[4] = (a22 * a00 - a02 * a20) / determinant;
    this.elements[5] = (-a12 * a00 + a02 * a10) / determinant;
    this.elements[6] = tmp2 / determinant;
    this.elements[7] = (-a21 * a00 + a01 * a20) / determinant;
    this.elements[8] = (a11 * a00 - a01 * a10) / determinant;
    return this;
  }

  /**
   * Transposes this matrix (mutates this)
   * @returns this instance, for method chaining
   */
  transpose(): Matrix3 {
    const [_e00, e01, e02, e10, _e11, e12, e20, e21, _e22] = this.elements;
    this.elements[1] = e10;
    this.elements[2] = e20;
    this.elements[3] = e01;
    this.elements[5] = e21;
    this.elements[6] = e02;
    this.elements[7] = e12;
    return this;
  }

  /**
   * Divides by other matrix (mutates this)
   * @param other other matrix
   * @returns `this` instance for method chaining if other is invertible, `null` otherwise
   */
  divide(other: Matrix3): Matrix3 | null {
    const {tmpMatrix} = Matrix3;
    tmpMatrix.copy(other);
    if (!tmpMatrix.invert()) {
      return null;
    }
    return this.multiply(tmpMatrix);
  }

  /** @ignore */
  _applyVector(x: number, y: number, z: number): Vector3 {
    const {tmpVector} = Matrix3;
    tmpVector.set(x, y, z);

    const [e00, e01, e02, e10, e11, e12, e20, e21, e22] = this.elements;
    const xOut = e00 * x + e10 * y + e20 * z;
    const yOut = e01 * x + e11 * y + e21 * z;
    const zOut = e02 * x + e12 * y + e22 * z;
    tmpVector.set(xOut, yOut, zOut);

    return tmpVector;
  }
}

export {Matrix3};
