import type { Clonable } from "./Clonable";
import type { Matrix4 } from "./Matrix4";
import { Vector3 } from "./Vector3";

class Quaternion implements Clonable<Quaternion> {
  private _a: number;
  private _b: number;
  private _c: number;
  private _d: number;

  static temporary = Quaternion.identity();

  private constructor(a: number, b: number, c: number, d: number) {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
  }

  get a(): number {
    return this._a;
  }

  get b(): number {
    return this._b;
  }

  get c(): number {
    return this._c;
  }

  get d(): number {
    return this._d;
  }

  static identity(): Quaternion {
    return new Quaternion(1, 0, 0, 0);
  }

  static fromAxisAndRadian(axis: Vector3, radian: number): Quaternion {
    const quaternion = Quaternion.identity();
    quaternion.setAxisAndRadian(axis, radian);
    return quaternion;
  }

  clone(): Quaternion {
    const {a, b, c, d} = this;
    return new Quaternion(a, b, c, d);
  }

  setValues(a: number, b: number, c: number, d: number): void {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
  }

  setIdentity(): void {
    this.setValues(1, 0, 0, 0);
  }

  setAxisAndRadian(axis: Vector3, radian: number): void {
    if (axis.isZero()) {
      this.setIdentity();
    }

    axis.normalize();
    const {x, y, z} = axis;
    const sin = Math.sin(radian / 2);
    this.setValues(Math.cos(radian / 2), x * sin, y * sin, z * sin);
  }

  norm(): number {
    const {a, b, c, d} = this;
    return a ** 2 + b ** 2 + c ** 2 + d ** 2;
  }

  setToMatrix4(matrix: Matrix4): void {
    const s = 2 / this.norm();
    const {a, b, c, d} = this;
    const b2 = b ** 2;
    const c2 = c ** 2;
    const d2 = d ** 2;
    const ab = a * b;
    const ac = a * c;
    const ad = a * d;
    const bc = b * c;
    const bd = b * d;
    const cd = c * d;
    matrix.setValues(
      1 - s * (c2 + d2),
      s * (bc - ad),
      s * (bd + ac),
      0,
      s * (bc * ad),
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
      1,
    );
  }

  multiply(other: Quaternion): Quaternion {
    const {a: ta, b: tb, c: tc, d: td} = this;
    const {a: oa, b: ob, c: oc, d: od} = other;
    this._a = ta * oa - tb * ob - tc * oc - td * od;
    this._b = ta * ob + tb * oa + tc * od - td * oc;
    this._c = ta * oc - tb * od + tc * oa + td * ob;
    this._d = ta * od + tb * oc - tc * ob + td * oa;
    return this;
  }

  rotateX(radian: number): Quaternion {
    const {temporary} = Quaternion;
    temporary.setIdentity();
    temporary.setAxisAndRadian(new Vector3(1, 0, 0), radian);
    return this.multiply(temporary);
  }

  rotateY(radian: number): Quaternion {
    const {temporary} = Quaternion;
    temporary.setIdentity();
    temporary.setAxisAndRadian(new Vector3(0, 1, 0), radian);
    return this.multiply(temporary);
  }

  rotateZ(radian: number): Quaternion {
    const {temporary} = Quaternion;
    temporary.setIdentity();
    temporary.setAxisAndRadian(new Vector3(0, 0, 1), radian);
    return this.multiply(temporary);
  }
}

export {Quaternion};
