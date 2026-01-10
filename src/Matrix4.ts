import type { Matrix } from "./Matrix";
import type { AdditiveGroup } from "./AdditiveGroup";
import type { Scalable } from "./Scalable";
import type { Clonable } from "./Clonable";
import { range } from "./functions";
import type { Quaternion } from "./Quaternion";
import { Vector3 } from "./Vector3";
import type { PartialMultiplicativeGroup } from "./PartialMultiplicativeGroup";
import { Vector4 } from "./Vector4";

const EPSILON = 1.0e-8;

/**
 * Options for generating a perspective projection matrix.
 */
type PerspectiveOptions = {
  /**
   * Determines the normalized device coordinate (NDC) Z range for the clip planes. [1, 2]
   * 
   * - `false` (default): Corresponds to a Z range of **[-1, 1]**, which matches the clip volume 
   *   requirements for **WebGL and OpenGL**. [1]
   * - `true`: Corresponds to a Z range of ****, which matches the clip volume 
   *   requirements for modern APIs such as **WebGPU, Vulkan, DirectX, and Metal**. [2]
   * 
   * @default false
   */
  depthZeroToOne?: boolean;
};

/**
 * 4x4 matrix class. It looks column-major order. And post multiplied.
 */
class Matrix4 implements Matrix<4>, AdditiveGroup<Matrix4>, PartialMultiplicativeGroup<Matrix4>, Scalable<Matrix4>, Clonable<Matrix4> {
  /**
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * console.log(m.order); // 4
   * ```
   */
  readonly order = 4;

  /**
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  readonly elements: Float32Array;

  private static _tmpMatrix?: Matrix4;
  private static get tmpMatrix(): Matrix4 {
    if (!this._tmpMatrix) {
      this._tmpMatrix = Matrix4.identity();
    }
    return this._tmpMatrix;
  }

  private static _tmpVector?: Vector4;
  private static get tmpVector(): Vector4 {
    if (!this._tmpVector) {
      this._tmpVector = Vector4.zero();
    }
    return this._tmpVector;
  }

  /**
   * Creates a new 4x4 matrix with the specified elements. \
   * The internal data is stored in **column-major** order in a `Float32Array`.
   * 
   * The parameters `e(column)(row)` correspond to the following matrix positions: \
   * ```
   * | e00 e10 e20 e30 |
   * | e01 e11 e21 e31 |
   * | e02 e12 e22 e32 |
   * | e03 e13 e23 e33 |
   * ```
   * 
   * The `elements` array stores each column sequentialy: \
   * `[e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33]`
   * 
   * @param e00 element in column 0, row 0
   * @param e01 element in column 0, row 1
   * @param e02 element in column 0, row 2
   * @param e03 element in column 0, row 3
   * @param e10 element in column 1, row 0
   * @param e11 element in column 1, row 1
   * @param e12 element in column 1, row 2
   * @param e13 element in column 1, row 3
   * @param e20 element in column 2, row 0
   * @param e21 element in column 2, row 1
   * @param e22 element in column 2, row 2
   * @param e23 element in column 2, row 3
   * @param e30 element in column 3, row 0
   * @param e31 element in column 3, row 1
   * @param e32 element in column 3, row 2
   * @param e33 element in column 3, row 3
   * 
   * @example
   * ```ts
   * const m = new Matrix4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
   * console.log(m.elements);
   * // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
   * ```
   */
  constructor(
    e00: number,
    e01: number,
    e02: number,
    e03: number,
    e10: number,
    e11: number,
    e12: number,
    e13: number,
    e20: number,
    e21: number,
    e22: number,
    e23: number,
    e30: number,
    e31: number,
    e32: number,
    e33: number,
  ) {
    this.elements = Float32Array.of(e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33);
  }

  /**
   * Creates a identity matrix instance
   * @returns new identity matrix instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  static identity(): Matrix4 {
    const matrix = Matrix4.zero();
    return matrix.setIdentity();
  }

  /**
   * Creates a new zero matrix instance
   * @returns new zero matrix instance
   * @group Factory Methods
   * 
   * @example
   * ```ts
   * const m = Matrix4.zero();
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  static zero(): Matrix4 {
    return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  /**
   * Creates new instance has same elements (pure)
   * @returns new cloned matrix instance
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * const c = m.clone();
   * console.log(c.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  clone(): Matrix4 {
    const [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33] = this.elements;
    return new Matrix4(e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33);
  }

  /**
   * Sets all elements (mutates this)
   * @param e00 element in column 0, row 0
   * @param e01 element in column 0, row 1
   * @param e02 element in column 0, row 2
   * @param e03 element in column 0, row 3
   * @param e10 element in column 1, row 0
   * @param e11 element in column 1, row 1
   * @param e12 element in column 1, row 2
   * @param e13 element in column 1, row 3
   * @param e20 element in column 2, row 0
   * @param e21 element in column 2, row 1
   * @param e22 element in column 2, row 2
   * @param e23 element in column 2, row 3
   * @param e30 element in column 3, row 0
   * @param e31 element in column 3, row 1
   * @param e32 element in column 3, row 2
   * @param e33 element in column 3, row 3
   * @returns this instance, for method chaining
   * 
   * @example
   * const m = Matrix4.zero();
   * m.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   */
  set(
    e00: number,
    e01: number,
    e02: number,
    e03: number,
    e10: number,
    e11: number,
    e12: number,
    e13: number,
    e20: number,
    e21: number,
    e22: number,
    e23: number,
    e30: number,
    e31: number,
    e32: number,
    e33: number,
  ): Matrix4 {
    this.elements[0] = e00;
    this.elements[1] = e01;
    this.elements[2] = e02;
    this.elements[3] = e03;
    this.elements[4] = e10;
    this.elements[5] = e11;
    this.elements[6] = e12;
    this.elements[7] = e13;
    this.elements[8] = e20;
    this.elements[9] = e21;
    this.elements[10] = e22;
    this.elements[11] = e23;
    this.elements[12] = e30;
    this.elements[13] = e31;
    this.elements[14] = e32;
    this.elements[15] = e33;
    return this;
  }

  /**
   * Copies all elements from other matrix (mutates this)
   * @param other other matrix
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.zero();
   * const i = Matrix4.identity();
   * m.set(i);
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  copy(other: Matrix4): void {
    const [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33] = other.elements;
    this.set(e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33);
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
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  setIdentity(): Matrix4 {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }

  /**
   * Sets scale transformation matrix (mutates this)
   * @param scale 3D scale vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * const s = new Vector3(2, 3, 4);
   * m.setScale(s);
   * console.log(m.elements);
   * // [ 2, 0, 0, 0,
   * //   0, 3, 0, 0,
   * //   0, 0, 4, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  setScale(scale: Vector3): Matrix4 {
    this.setIdentity();
    const {order} = this;
    for (const row of range(order)) {
      const scalar = row === order - 1 ? 1 : scale.elements[row];
      for (const column of range(order)) {
        const index = row * order + column;
        this.elements[index] *= scalar;
      }
    }
    return this;
  }

  /**
   * Sets translation transformation matrix (mutates this)
   * @param translation translation vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * const t = new Vector3(2, 3, 4);
   * m.setTranslation(t);
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   2, 3, 4, 1 ]
   * ```
   */
  setTranslation(translation: Vector3): Matrix4 {
    const {x, y, z} = translation;
    const [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33] = this.elements;
    this.setIdentity();
    this.elements[12] = e00 * x + e10 * y + e20 * z + e30;
    this.elements[13] = e01 * x + e11 * y + e21 * z + e31;
    this.elements[14] = e02 * x + e12 * y + e22 * z + e32;
    this.elements[15] = e03 * x + e13 * y + e23 * z + e33;
    return this;
  }

  /**
   * Sets rotation matrix from quaternion  (mutates this)
   * @param rotation
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.zero();
   * const q = Quaternion.identity();
   * m.setRotation(q);
   * console.log(m.elements);
   * // [ 0, 0, 0, 0,
   * //   0, 0, 0, 0,
   * //   0, 0, 0, 0,
   * //   0, 0, 0, 0 ]
   * ```
   */
  setRotation(rotation: Quaternion): Matrix4 {
    const {a, b, c, d} = rotation;
    const s = 2 / rotation.squaredNorm();
    const b2 = b ** 2;
    const c2 = c ** 2;
    const d2 = d ** 2;
    const ab = a * b;
    const ac = a * c;
    const ad = a * d;
    const bc = b * c;
    const bd = b * d;
    const cd = c * d;
    this.set(
      1 - s * (c2 + d2),
      s * (bc - ad),
      s * (bd + ac),
      0,
      s * (bc + ad),
      1 - s * (b2 + d2),
      s * (cd - ab),
      0,
      s * (bd - ac),
      s * (cd + ab),
      1 - s * (b2 + c2),
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }

  /**
   * Adds by other matrix (mutates this)
   * @param other other matrix
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m1 = Matrix4.zero();
   * const m2 = Matrix4.identity();
   * m1.add(m2);
   * console.log(m1.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  add(other: Matrix4): Matrix4 {
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
   * const m1 = Matrix4.zero();
   * const m2 = Matrix4.identity();
   * m1.subtract(m2);
   * console.log(m1.lements);
   * // [ -1,  0,  0,  0,
   * //    0, -1,  0,  0,
   * //    0,  0, -1,  0,
   * //    0,  0,  0, -1 ]
   * ```
   */
  subtract(other: Matrix4): Matrix4 {
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
   * const m = Matrix4.identity();
   * m.multiplyScalar(2);
   * console.log(m.elements);
   * // [ 2, 0, 0, 0,
   * //   0, 2, 0, 0,
   * //   0, 0, 2, 0,
   * //   0, 0, 0, 2 ]
   * ```
   */
  multiplyScalar(scalar: number): Matrix4 {
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
   * const m = Matrix4.identity();
   * m.divideScalar(2);
   * console.log(m.elements);
   * // [ 0.5,   0,   0,   0,
   * //     0, 0.5,   0,   0,
   * //     0,   0, 0.5,   0,
   * //     0,   0,   0, 0.5 ]
   * ```
   */
  divideScalar(scalar: number): Matrix4 {
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
   * const m1 = Matrix4.identity();
   * const m2 = Matrix4.zero();
   * m1.multiply(m2);
   * console.log(m.elements);
   * // [ 0, 0, 0, 0,
   * //   0, 0, 0, 0,
   * //   0, 0, 0, 0,
   * //   0, 0, 0, 0 ]
   * ```
   */
  multiply(other: Matrix4): Matrix4 {
    const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = this.elements;
    const [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = other.elements;
    this.elements[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    this.elements[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    this.elements[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    this.elements[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    this.elements[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    this.elements[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    this.elements[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    this.elements[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    this.elements[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    this.elements[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    this.elements[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    this.elements[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    this.elements[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    this.elements[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    this.elements[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    this.elements[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
    return this;
  }

  /**
   * Multiplies scale matrix to this instance (mutates this)
   * @param scale 3D scale vector
   * @returns this instance, for method chaining
   */
  multiplyScale(scale: Vector3): Matrix4 {
    return this.multiply(Matrix4.tmpMatrix.setScale(scale));
  }

  /**
   * Multiplies translation matrix to this instance (mutates this)
   * @param position translation vector
   * @returns this instance, for method chaining
   */
  multiplyTranslation(position: Vector3): Matrix4 {
    return this.multiply(Matrix4.tmpMatrix.setTranslation(position));
  }

  /**
   * Multiplies rotation matrix to this instance (mutates this)
   * @param rotation rotation quaternion
   * @returns this instance, for method chaining
   */
  multiplyRotation(rotation: Quaternion): Matrix4 {
    return this.multiply(Matrix4.tmpMatrix.setRotation(rotation));
  }

  /**
   * Calculates determinant of this matrix (pure)
   * @returns determinant of this matrix
   */
  determinant(): number {
    const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = this.elements;
    return (
      a00 * (a11 * (a22 * a33 - a23 * a32) -
      a12 * (a21 * a33 - a23 * a31) +
      a13 * (a21 * a32 - a22 * a31)) -
      a01 * (a10 * (a22 * a33 - a23 * a32) -
      a12 * (a20 * a33 - a23 * a30) +
      a13 * (a20 * a32 - a22 * a30)) +
      a02 * (a10 * (a21 * a33 - a23 * a31) -
      a11 * (a20 * a33 - a23 * a30) +
      a13 * (a20 * a31 - a21 * a30)) -
      a03 * (a10 * (a21 * a32 - a22 * a31) -
      a11 * (a20 * a32 - a22 * a30) +
      a12 * (a20 * a31 - a21 * a30))
    );
  }

  /**
   * Sets inverse of this matrix to this instance (mutates this)
   * @returns `this` instance for method chaining if this is invertible, `null` otherwise
   */
  invert(): Matrix4 | null {
    const determinant = this.determinant();
    if (Math.abs(determinant) < EPSILON) {
      return null;
    }

    const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = this.elements;

    const tmp0 = a22 * a33 - a23 * a32;
    const tmp1 = a21 * a33 - a23 * a31;
    const tmp2 = a21 * a32 - a22 * a31;
    const tmp3 = a12 * a33 - a13 * a32;
    const tmp4 = a11 * a33 - a13 * a31;
    const tmp5 = a11 * a32 - a12 * a31;
    const tmp6 = a12 * a23 - a13 * a22;
    const tmp7 = a11 * a23 - a13 * a21;
    const tmp8 = a11 * a22 - a12 * a21;
    const tmp9 = a20 * a33 - a23 * a30;
    const tmp10 = a20 * a32 - a22 * a30;
    const tmp11 = a10 * a33 - a13 * a30;
    const tmp12 = a10 * a32 - a12 * a30;
    const tmp13 = a10 * a23 - a13 * a20;
    const tmp14 = a10 * a22 - a12 * a20;
    const tmp15 = a20 * a31 - a21 * a30;
    const tmp16 = a10 * a31 - a11 * a30;
    const tmp17 = a10 * a21 - a11 * a20;

    this.elements[0] = (a11 * tmp0 - a12 * tmp1 + a13 * tmp2) / determinant;
    this.elements[1] = -(a01 * tmp0 - a02 * tmp1 + a03 * tmp2) / determinant;
    this.elements[2] = (a01 * tmp3 - a02 * tmp4 + a03 * tmp5) / determinant;
    this.elements[3] = -(a01 * tmp6 - a02 * tmp7 + a03 * tmp8) / determinant;
    this.elements[4] = -(a10 * tmp0 - a12 * tmp9 + a13 * tmp10) / determinant;
    this.elements[5] = (a00 * tmp0 - a02 * tmp9 + a03 * tmp10) / determinant;
    this.elements[6] = -(a00 * tmp3 - a02 * tmp11 + a03 * tmp12) / determinant;
    this.elements[7] = (a00 * tmp6 - a02 * tmp13 + a03 * tmp14) / determinant;
    this.elements[8] = (a10 * tmp1 - a11 * tmp9 + a13 * tmp15) / determinant;
    this.elements[9] = -(a00 * tmp1 - a01 * tmp9 + a03 * tmp15) / determinant;
    this.elements[10] = (a00 * tmp4 - a01 * tmp11 + a03 * tmp16) / determinant;
    this.elements[11] = -(a00 * tmp7 - a01 * tmp13 + a03 * tmp17) / determinant;
    this.elements[12] = -(a10 * tmp2 - a11 * tmp10 + a12 * tmp15) / determinant;
    this.elements[13] = (a00 * tmp2 - a01 * tmp10 + a02 * tmp15) / determinant;
    this.elements[14] = -(a00 * tmp5 - a01 * tmp12 + a02 * tmp16) / determinant;
    this.elements[15] = (a00 * tmp8 - a01 * tmp14 + a02 * tmp17) / determinant;

    return this;
  }

  /**
   * Transposes this matrix (mutates this)
   * @returns this instance, for method chaining
   */
  transpose(): Matrix4 {
    const [_e00, e01, e02, e03, e10, _e11, e12, e13, e20, e21, _e22, e23, e30, e31, e32, _e33] = this.elements;
    this.elements[1] = e10;
    this.elements[2] = e20;
    this.elements[3] = e30;
    this.elements[4] = e01;
    this.elements[6] = e21;
    this.elements[7] = e31;
    this.elements[8] = e02;
    this.elements[9] = e12;
    this.elements[11] = e32;
    this.elements[12] = e03;
    this.elements[13] = e13;
    this.elements[14] = e23;
    return this;
  }

  /**
   * Divides by other matrix (mutates this)
   * @param other other matrix
   * @returns `this` instance for method chaining if other is invertible, `null` otherwise
   */
  divide(other: Matrix4): Matrix4 | null {
    const {tmpMatrix} = Matrix4;
    tmpMatrix.copy(other);
    if (!tmpMatrix.invert()) {
      return null;
    }
    return this.multiply(tmpMatrix);
  }

  /**
   * Sets view transformation matrix (mutates this)
   * @param position camera position
   * @param target camera target looking at
   * @param up up vector of camera
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * const p = new Vector3(0, -2, 0);
   * const t = Vector3.zero();
   * const u = new Vector3(0, 0, 1);
   * m.lookAt(p, t, u);
   * ```
   */
  lookAt(position: Vector3, target: Vector3, up: Vector3): Matrix4 {
    const {x: px, y: py, z: pz} = position;
    const {x: ux, y: uy, z: uz} = up;
    let cx = position.x - target.x;
    let cy = position.y - target.y;
    let cz = position.z - target.z;
    const cLength = Math.sqrt(cx ** 2 + cy ** 2 + cz ** 2);
    if (cLength < EPSILON) {
      return this;
    }

    cx /= cLength;
    cy /= cLength;
    cz /= cLength;

    let ax = uy * cz - uz * cy;
    let ay = uz * cx - ux * cz;
    let az = ux * cy - uy * cx;
    const aLength = Math.sqrt(ax ** 2 + ay ** 2 + az ** 2);
    if (aLength > 0) {
      ax /= aLength;
      ay /= aLength;
      az /= aLength;
    }

    let bx = cy * az - cz * ay;
    let by = cz * ax - cx * az;
    let bz = cx * ay - cy * ax;
    const bLength = Math.sqrt(bx ** 2 + by ** 2 + bz ** 2);
    if (bLength > 0) {
      bx /= bLength;
      by /= bLength;
      bz /= bLength;
    }

    const dx = -(ax * px + ay * py + az * pz);
    const dy = -(bx * px + by * py + bz * pz);
    const dz = -(cx * px + cy * py + cz * pz);
    this.set(ax, bx, cx, 0, ay, by, cy, 0, az, bz, cz, 0, dx, dy, dz, 1);

    return this;
  }

  /**
   * Sets projection matrix of perspective camera (mutates this)
   * @param verticalFov vertical field of view in radians
   * @param near near clipping plane distance
   * @param far far clipping plane distance
   * @param aspect aspect ratio (width / height)
   * @param options options for perspective projection matrix
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * const fov = Math.PI / 4;
   * const near = 0.01;
   * const far = 4.0;
   * const aspect = 300 / 150;
   * 
   * // for OpenGL, WebGL
   * m.perspective(fov, near, far, aspect);
   * 
   * // for WebGPU, Vulkan, DirectX, Metal
   * m.perspective(fov, near, far, aspect, {depthZeroToOne: true});
   * ```
   */
  perspective(
    verticalFov: number,
    near: number,
    far: number,
    aspect: number,
    options?: PerspectiveOptions
  ): Matrix4 {
    const f = 1.0 / Math.tan(verticalFov / 2);
    this.set(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, 1, -1, 0, 0, 1, 0);

    const depthZeroToOne = options?.depthZeroToOne ?? false;
    const coefficient = depthZeroToOne ? 1 : 2;

    if (far !== Infinity) {
      const numerator = depthZeroToOne ? far : (far + near);
      this.elements[10] = -numerator / (far - near);
      this.elements[14] = -coefficient * far * near / (far - near);
    } else {
      this.elements[10] = -1;
      this.elements[14] = -coefficient * near;
    }

    return this;
  }

  /** @ignore */
  _applyVector(x: number, y: number, z: number, w: number): Vector4 {
    const {tmpVector} = Matrix4;
    tmpVector.set(x, y, z, w);

    const [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33] = this.elements;
    const xOut = e00 * x + e10 * y + e20 * z + e30 * w;
    const yOut = e01 * x + e11 * y + e21 * z + e31 * w;
    const zOut = e02 * x + e12 * y + e22 * z + e32 * w;
    const wOut = e03 * x + e13 * y + e23 * z + e33 * w;
    tmpVector.set(xOut, yOut, zOut, wOut);

    return tmpVector;
  }
}

export {Matrix4};
export type {PerspectiveOptions};
