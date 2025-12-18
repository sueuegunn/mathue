import type { Clonable } from "./Clonable";
import type { Vector } from "./type";

const INDEX_X = 0;
const INDEX_Y = 1;
const INDEX_Z = 2;

class Vector3 implements Vector<3>, Clonable<Vector3> {
  readonly dimension = 3;
  readonly elements: [number, number, number];

  constructor(x: number, y: number, z: number) {
    this.elements = [x, y, z];
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

  clone(): Vector3 {
    const {x, y, z} = this;
    return new Vector3(x, y, z);
  }

  static zero(): Vector3 {
    return new Vector3(0, 0, 0);
  }

  static allOnes(): Vector3 {
    return new Vector3(1, 1, 1);
  }

  isZero(): boolean {
    const {x, y, z} = this;
    return x === 0 && y === 0 && z === 0;
  }

  setValues(x: number, y: number, z: number): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  set(other: Vector3): Vector3 {
    const {x, y, z} = other;
    return this.setValues(x, y, z);
  }

  add(other: Vector3): Vector3 {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }

  subtract(other: Vector3): Vector3 {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }

  multiply(scalar: number): Vector3 {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  divide(scalar: number): Vector3 {
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;
    return this;
  }

  cross(other: Vector3, out?: Vector3): Vector3 {
    const {x: tx, y: ty, z: tz} = this;
    const {x: ox, y: oy, z: oz} = other;
    const x = ty * oz - tz * oy;
    const y = tz * ox - tx * oz;
    const z = tx * oy - ty * ox;
    if (out) {
      out.setValues(x, y, z);
      return out;
    }
    return new Vector3(x, y, z);
  }

  magnitude(): number {
    const {x, y, z} = this;
    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  normalize(): Vector3 {
    const length = this.magnitude();
    if (length <= 0) {
      return this;
    }
    return this.divide(length);
  }
}

export {Vector3};
