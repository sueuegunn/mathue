import type { Additive } from "./Additive";
import type { Clonable } from "./Clonable";
import type { Scalable } from "./Scalable";
import type { Vector } from "./Vector";

const INDEX_X = 0;
const INDEX_Y = 1;

class Vector2 implements Vector<2>, Clonable<Vector2>, Additive<Vector2>, Scalable<Vector2> {
  readonly dimension = 2;
  readonly elements: [number, number];

  constructor(x: number, y: number) {
    this.elements = [x, y];
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

  clone(): Vector2 {
    const {x, y} = this;
    return new Vector2(x, y);
  }

  static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  static allOnes(): Vector2 {
    return new Vector2(1, 1);
  }

  setValues(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  set(other: Vector2): Vector2 {
    const {x, y} = other;
    return this.setValues(x, y);
  }

  add(other: Vector2): Vector2 {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  subtract(other: Vector2): Vector2 {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  scalarMultiply(scalar: number): Vector2 {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  scalarDivide(scalar: number): Vector2 {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  magnitude(): number {
    const {x, y} = this;
    return Math.sqrt(x ** 2 + y ** 2);
  }

  normalize(): Vector2 {
    const length = this.magnitude();
    if (length <= 0) {
      return this;
    }
    return this.scalarDivide(length);
  }

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
