import type { Matrix } from "./Matrix";
import type { AdditiveGroup } from "./AdditiveGroup";
import type { Scalable } from "./Scalable";
import type { Clonable } from "./Clonable";
import { range } from "./function";
import type { Quaternion } from "./Quaternion";
import type { TupleOf } from "./types";
import { Vector3 } from "./Vector3";
import type { PartialMultiplicativeGroup } from "./PartialMultiplicativeGroup";

const EPSILON = 0.0001;

class Matrix4 implements Matrix<4>, AdditiveGroup<Matrix4>, PartialMultiplicativeGroup<Matrix4>, Scalable<Matrix4>, Clonable<Matrix4> {
  /**
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * console.log(m.rank); // 4
   * ```
   */
  readonly rank = 4;

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
  readonly elements: TupleOf<number, 16>;

  private static temporary = Matrix4.identity();

  /**
   * @example
   * ```ts
   * const m = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
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
    this.elements = [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33];
  }

  /**
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
   * @returns this instance, for method chaining
   * 
   * @example
   * const m = Matrix4.zero();
   * m.setValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   */
  setValues(
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
  set(other: Matrix4): void {
    const [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33] = other.elements;
    this.setValues(e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33);
  }

  /**
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
    this.setValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }

  /**
   * set quaternion to this matrix
   * @param quaternion
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.zero();
   * const q = Quaternion.identity();
   * m.setQuaternion(q);
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  setQuaternion(quaternion: Quaternion): Matrix4 {
    const {a, b, c, d} = quaternion;
    const s = 2 / quaternion.squaredNorm();
    const b2 = b ** 2;
    const c2 = c ** 2;
    const d2 = d ** 2;
    const ab = a * b;
    const ac = a * c;
    const ad = a * d;
    const bc = b * c;
    const bd = b * d;
    const cd = c * d;
    this.setValues(
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
   * @param other 
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
    const {rank} = this;
    for (const index of range(rank ** 2)) {
      this.elements[index] += other.elements[index];
    }
    return this;
  }

  /**
   * @param other 
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
    const {rank} = this;
    for (const index of range(rank ** 2)) {
      this.elements[index] -= other.elements[index];
    }
    return this;
  }

  /**
   * @param scalar 
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * m.scalarMultiply(2);
   * console.log(m.elements);
   * // [ 2, 0, 0, 0,
   * //   0, 2, 0, 0,
   * //   0, 0, 2, 0,
   * //   0, 0, 0, 2 ]
   * ```
   */
  scalarMultiply(scalar: number): Matrix4 {
    const {rank} = this;
    for (const index of range(rank ** 2)) {
      this.elements[index] *= scalar;
    }
    return this;
  }

  /**
   * @param scalar 
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * m.scalarDivide(2);
   * console.log(m.elements);
   * // [ 0.5,   0,   0,   0,
   * //     0, 0.5,   0,   0,
   * //     0,   0, 0.5,   0,
   * //     0,   0,   0, 0.5 ]
   * ```
   */
  scalarDivide(scalar: number): Matrix4 {
    const {rank} = this;
    for (const index of range(rank ** 2)) {
      this.elements[index] /= scalar;
    }
    return this;
  }

  /**
   * @param other 
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
   * Calculates determinant of this matrix
   * @returns determinant of this matrix
   */
  determinant(): number {
    const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = this.elements;

    return a00 * (a11 * (a22 * a33 - a23 * a32)
      - a12 * (a21 * a33 - a23 * a31)
      + a13 * (a21 * a32 - a22 * a31))
      - a01 * (a10 * (a22 * a33 - a23 * a32)
      - a12 * (a20 * a33 - a23 * a30)
      + a13 * (a20 * a32 - a22 * a30))
      + a02 * (a10 * (a21 * a33 - a23 * a31)
      - a11 * (a20 * a33 - a23 * a30)
      + a13 * (a20 * a31 - a21 * a30))
      - a03 * (a10 * (a21 * a32 - a22 * a31)
      - a11 * (a20 * a32 - a22 * a30)
      + a12 * (a20 * a31 - a21 * a30));
  }

  /**
   * Calculates inverse of this matrix (mutates this)
   * @returns `this` instance for method chaining if this is invertible, `null` otherwise
   */
  invert(): Matrix4 | null {
    // 行列式計算
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

    // 1行目
    this.elements[0] = (a11 * tmp0 - a12 * tmp1 + a13 * tmp2) / determinant;
    this.elements[1] = -(a01 * tmp0 - a02 * tmp1 + a03 * tmp2) / determinant;
    this.elements[2] = (a01 * tmp3 - a02 * tmp4 + a03 * tmp5) / determinant;
    this.elements[3] = -(a01 * tmp6 - a02 * tmp7 + a03 * tmp8) / determinant;
    // 2行目
    this.elements[4] = -(a10 * tmp0 - a12 * tmp9 + a13 * tmp10) / determinant;
    this.elements[5] = (a00 * tmp0 - a02 * tmp9 + a03 * tmp10) / determinant;
    this.elements[6] = -(a00 * tmp3 - a02 * tmp11 + a03 * tmp12) / determinant;
    this.elements[7] = (a00 * tmp6 - a02 * tmp13 + a03 * tmp14) / determinant;
    // 3行目
    this.elements[8] = (a10 * tmp1 - a11 * tmp9 + a13 * tmp15) / determinant;
    this.elements[9] = -(a00 * tmp1 - a01 * tmp9 + a03 * tmp15) / determinant;
    this.elements[10] = (a00 * tmp4 - a01 * tmp11 + a03 * tmp16) / determinant;
    this.elements[11] = -(a00 * tmp7 - a01 * tmp13 + a03 * tmp17) / determinant;
    // 4行目
    this.elements[12] = -(a10 * tmp2 - a11 * tmp10 + a12 * tmp15) / determinant;
    this.elements[13] = (a00 * tmp2 - a01 * tmp10 + a02 * tmp15) / determinant;
    this.elements[14] = -(a00 * tmp5 - a01 * tmp12 + a02 * tmp16) / determinant;
    this.elements[15] = (a00 * tmp8 - a01 * tmp14 + a02 * tmp17) / determinant;

    return this;
  }

  /**
   * Divides this instance by other matrix (mutates this)
   * @param other other matrix
   * @returns `this` instance for method chaining if other is invertible, `null` otherwise
   */
  divide(other: Matrix4): Matrix4 | null {
    const {temporary} = Matrix4;
    temporary.set(other);
    if (!temporary.invert()) {
      return null;
    }
    return this.multiply(temporary);
  }

  private indexToScalar(row: number, scale: Vector3): number {
    switch(row) {
      case 0:
        return scale.x;
      case 1:
        return scale.y;
      case 2:
        return scale.z;
      default:
        return 1;
    }
  }

  /**
   * apply scale transformation
   * @param scale 3D scale vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * const s = new Vector3(2, 3, 4);
   * m.scale(s);
   * console.log(m.elements);
   * // [ 2, 0, 0, 0,
   * //   0, 3, 0, 0,
   * //   0, 0, 4, 0,
   * //   0, 0, 0, 1 ]
   * ```
   */
  scale(scale: Vector3): Matrix4 {
    const {rank} = this;
    for (const row of range(rank)) {
      const scalar = this.indexToScalar(row, scale);
      for (const column of range(rank)) {
        const index = row * rank + column;
        this.elements[index] *= scalar;
      }
    }
    return this;
  }

  /**
   * apply translation transformation
   * @param translation 3D translation vector
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * const t = new Vector3(2, 3, 4);
   * m.translate(t);
   * console.log(m.elements);
   * // [ 1, 0, 0, 0,
   * //   0, 1, 0, 0,
   * //   0, 0, 1, 0,
   * //   2, 3, 4, 1 ]
   * ```
   */
  translate(translation: Vector3): Matrix4 {
    const {x, y, z} = translation;
    const [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33] = this.elements;
    this.elements[12] = e00 * x + e10 * y + e20 * z + e30;
    this.elements[13] = e01 * x + e11 * y + e21 * z + e31;
    this.elements[14] = e02 * x + e12 * y + e22 * z + e32;
    this.elements[15] = e03 * x + e13 * y + e23 * z + e33;
    return this;
  }

  /**
   * set view transformation matrix
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
    const toPosition = position.clone().subtract(target);
    const length = toPosition.length();
    if (length < EPSILON) {
      return this;
    }

    toPosition.normalize();
    const {x, y, z} = toPosition;

    const ax = uy * z - uz * y;
    const ay = uz * x - ux * z;
    const az = ux * y - uy * x;
    const a = new Vector3(ax, ay, az).normalize();

    const bx = y * a.z - z * a.y;
    const by = z * a.x - x * a.z;
    const bz = x * a.y - y * a.x;
    const b = new Vector3(bx, by, bz).normalize();

    this.setValues(
      a.x,
      b.x,
      x,
      0,
      a.y,
      b.y,
      y,
      0,
      a.z,
      b.z,
      z,
      0,
      -(a.x * px + a.y * py + a.z * pz),
      -(b.x * px + b.y * py + b.z * pz),
      -(x * px + y * py + z * pz),
      1
    );

    return this;
  }

  /**
   * set projection matrix of perspective camera
   * @param verticalFov vertical field of view in radians
   * @param near near clipping plane distance
   * @param far far clipping plane distance
   * @param aspect aspect ratio (width / height)
   * @returns this instance, for method chaining
   * 
   * @example
   * ```ts
   * const m = Matrix4.identity();
   * const fov = Math.PI / 4;
   * const near = 0.01;
   * const far = 4.0;
   * const aspect = 300 / 150;
   * m.perspective(fov, near, far, aspect);
   * ```
   */
  perspective(verticalFov: number, near: number, far: number, aspect: number): Matrix4 {
    const f = 1.0 / Math.tan(verticalFov / 2);
    this.setValues(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, 1, -1, 0, 0, 1, 0);

    if (far === Infinity) {
      this.elements[10] = -(far + near) / (far - near);
      this.elements[14] = -2 * far * near / (far - near);
    } else {
      this.elements[10] = -1;
      this.elements[14] = -2 * near;
    }

    return this;
  }
}

export {Matrix4};
