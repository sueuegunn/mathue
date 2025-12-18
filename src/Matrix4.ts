import type { Clonable } from "./Clonable";
import { range } from "./function";
import type { Quaternion } from "./Quaternion";
import { Vector3 } from "./Vector3";

const NUM_ELEMENTS = 16;
const DIMENSION = 4;
const EPSILON = 0.0001;

// const indexToRow = (index: number): number => {
//   return Math.floor(index / DIMENSION);
// };

// const indexToColumn = (index: number): number => {
//   return index % 4;
// };

const toIndex = (row: number, column: number): number => {
  return row * DIMENSION + column;
};

class Matrix4 extends Float32Array implements Clonable<Matrix4> {
  constructor() {
    super(NUM_ELEMENTS);
    this.setIdentity();
  }

  clone(): Matrix4 {
    const cloned = new Matrix4();
    const [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33] = this;
    cloned.setValues(e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33);
    return cloned;
  }

  static identity(): Matrix4 {
    const matrix = new Matrix4();
    return matrix;
  }

  static zero(): Matrix4 {
    const matrix = new Matrix4();
    matrix.setValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return matrix;
  }

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
  ): void {
    this[0] = e00;
    this[1] = e01;
    this[2] = e02;
    this[3] = e03;
    this[4] = e10;
    this[5] = e11;
    this[6] = e12;
    this[7] = e13;
    this[8] = e20;
    this[9] = e21;
    this[10] = e22;
    this[11] = e23;
    this[12] = e30;
    this[13] = e31;
    this[14] = e32;
    this[15] = e33;
  }

  set(other: Matrix4): void {
    const [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33] = other;
    this.setValues(e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33);
  }

  setIdentity(): Matrix4 {
    this.setValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }

  setQuaternion(quaternion: Quaternion): Matrix4 {
    const {a, b, c, d} = quaternion;
    const s = 2 / quaternion.norm();
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

  multiplyScalar(scalar: number): Matrix4 {
    for (const index of range(NUM_ELEMENTS)) {
      this[index] *= scalar;
    }
    return this;
  }

  multiply(other: Matrix4): Matrix4 {
    const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = this;
    const [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = other;
    this[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    this[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    this[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    this[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    this[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    this[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    this[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    this[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    this[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    this[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    this[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    this[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    this[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    this[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    this[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    this[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
    return this;
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

  scale(scale: Vector3): Matrix4 {
    for (const row of range(DIMENSION)) {
      const scalar = this.indexToScalar(row, scale);
      for (const column of range(DIMENSION)) {
        const index = toIndex(row, column);
        this[index] *= scalar;
      }
    }
    return this;
  }

  translate(translation: Vector3): Matrix4 {
    const {x, y, z} = translation;
    const [e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33] = this;
    this[12] = e00 * x + e10 * y + e20 * z + e30;
    this[13] = e01 * x + e11 * y + e21 * z + e31;
    this[14] = e02 * x + e12 * y + e22 * z + e32;
    this[15] = e03 * x + e13 * y + e23 * z + e33;
    return this;
  }

  lookAt(position: Vector3, target: Vector3, up: Vector3): Matrix4 {
    const {x: px, y: py, z: pz} = position;
    const {x: ux, y: uy, z: uz} = up;
    const toPosition = position.clone().subtract(target);
    const length = toPosition.magnitude();
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

  perspective(verticalFov: number, near: number, far: number, aspect: number): Matrix4 {
    const f = 1.0 / Math.tan(verticalFov / 2);
    this.setValues(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, 1, -1, 0, 0, 1, 0);

    if (far === Infinity) {
      this[10] = -(far + near) / (far - near);
      this[14] = -2 * far * near / (far - near);
    } else {
      this[10] = -1;
      this[14] = -2 * near;
    }

    return this;
  }
}

export {Matrix4};
