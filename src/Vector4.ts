import type { Vector } from "./Vector";
import type { Additive } from "./Additive";
import type { Scalable } from "./Scalable";
import type { Clonable } from "./Clonable";

const INDEX_X = 0;
const INDEX_Y = 1;
const INDEX_Z = 2;
const INDEX_W = 3;

class Vector4 implements Vector<4>, Additive<Vector4>, Scalable<Vector4>, Clonable<Vector4> {
  readonly dimension = 4;
  readonly elements: [number, number, number, number];

  constructor(x: number, y: number, z: number, w: number) {
    this.elements = [x, y, z, w];
  }

  get x(): number {
    return this.elements[INDEX_X];
  }

  set x(x: number) {
    this.elements[INDEX_X] = x;
  }

  get y(): number {
    return this.elements[INDEX_Y];
  }

  set y(y: number) {
    this.elements[INDEX_Y] = y;
  }

  get z(): number {
    return this.elements[INDEX_Z];
  }

  set z(z: number) {
    this.elements[INDEX_Z] = z;
  }

  get w(): number {
    return this.elements[INDEX_W];
  }

  set w(w: number) {
    this.elements[INDEX_W] = w;
  }

  clone(): Vector4 {
    const {x, y, z, w} = this;
    return new Vector4(x, y, z, w);
  }

  static zero(): Vector4 {
    return new Vector4(0, 0, 0, 0);
  }

  static allOnes(): Vector4 {
    return new Vector4(1, 1, 1, 1);
  }

  isZero(): boolean {
    const {x, y, z, w} = this;
    return x === 0 && y === 0 && z === 0 && w === 0;
  }

  setValues(x: number, y: number, z: number, w: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  set(other: Vector4): void {
    const {x, y, z, w} = other;
    this.setValues(x, y, z, w);
  }

  add(other: Vector4): Vector4 {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    this.w += other.w;
    return this;
  }

  subtract(other: Vector4): Vector4 {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    this.w -= other.w;
    return this;
  }

  scalarMultiply(scalar: number): Vector4 {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;
    return this;
  }

  scalarDivide(scalar: number): Vector4 {
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;
    this.w /= scalar;
    return this;
  }

  magnitude(): number {
    const {x, y, z, w} = this;
    return Math.sqrt(x ** 2 + y ** 2 + z ** 2 + w ** 2);
  }

  normalize(): Vector4 {
    const length = this.magnitude();
    if (length <= 0) {
      return this;
    }
    return this.scalarDivide(length);
  }
}

export {Vector4};