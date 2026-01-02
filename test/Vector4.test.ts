import { describe, expect, it } from "vitest";
import {Vector4} from '../src/Vector4';
import { Matrix4 } from "../src/Matrix4";
import { Vector3 } from "../src/Vector3";
import { Quaternion } from "../src/Quaternion";

const PRECISION = 8;

describe('Vector4', () => {
  it('gets x', () => {
    const v = new Vector4(1, 2, 3, 4);
    expect(v.x).toBe(1);
  });

  it('sets x', () => {
    const v = Vector4.zero();
    v.x = 1;
    expect(v.x).toBe(1);
  });

  it('gets y', () => {
    const v = new Vector4(1, 2, 3, 4);
    expect(v.y).toBe(2);
  });

  it('sets y', () => {
    const v = Vector4.zero();
    v.y = 1;
    expect(v.y).toBe(1);
  });

  it('gets z', () => {
    const v = new Vector4(1, 2, 3, 4);
    expect(v.z).toBe(3);
  });

  it('sets z', () => {
    const v = Vector4.zero();
    v.z = 1;
    expect(v.z).toBe(1);
  });

  it('gets w', () => {
    const v = new Vector4(1, 2, 3, 4);
    expect(v.w).toBe(4);
  });

  it('sets w', () => {
    const v = Vector4.zero();
    v.w = 1;
    expect(v.w).toBe(1);
  });

  it('zero()', () => {
    const v = Vector4.zero();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
    expect(v.w).toBe(0);
  });

  it('one()', () => {
    const v = Vector4.one();
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);
    expect(v.z).toBe(1);
    expect(v.w).toBe(1);
  });

  it('clone()', () => {
    const v = new Vector4(1, 2, 3, 4);
    const c = v.clone();
    expect(c.x).toBe(1);
    expect(c.y).toBe(2);
    expect(c.z).toBe(3);
    expect(c.w).toBe(4);
  });

  it('isZero()', () => {
    const z = Vector4.zero();
    expect(z.isZero()).toBeTruthy();

    const o = Vector4.one();
    expect(o.isZero()).toBeFalsy();
  });

  it('set()', () => {
    const v = Vector4.zero();
    v.set(1, 2, 3, 4);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
    expect(v.w).toBe(4);
  });

  it('copy()', () => {
    const v1 = Vector4.zero();
    const v2 = new Vector4(1, 2, 3, 4);
    v1.copy(v2);
    expect(v1.x).toBe(1);
    expect(v1.y).toBe(2);
    expect(v1.z).toBe(3);
    expect(v1.w).toBe(4);
  });

  it('add()', () => {
    const v1 = new Vector4(0, 1, 2, 3);
    const v2 = new Vector4(5, 6, 7, 8);
    v1.add(v2);
    expect(v1.x).toBe(5);
    expect(v1.y).toBe(7);
    expect(v1.z).toBe(9);
    expect(v1.w).toBe(11);
  });

  it('subtract()', () => {
    const v1 = new Vector4(0, 1, 2, 3);
    const v2 = new Vector4(5, 6, 7, 8);
    v1.subtract(v2);
    expect(v1.x).toBe(-5);
    expect(v1.y).toBe(-5);
    expect(v1.z).toBe(-5);
    expect(v1.w).toBe(-5);
  });

  it('multiplyScalar()', () => {
    const v = new Vector4(0, 1, 2, 3);
    v.multiplyScalar(2);
    expect(v.x).toBe(0);
    expect(v.y).toBe(2);
    expect(v.z).toBe(4);
    expect(v.w).toBe(6);
  });

  it('divideScalar()', () => {
    const v = new Vector4(0, 2, 4, 6);
    v.divideScalar(2);
    expect(v.x).toBe(0);
    expect(v.y).toBe(1);
    expect(v.z).toBe(2);
    expect(v.w).toBe(3);
  });

  it('length()', () => {
    const v = new Vector4(1, 2, 2, 4);
    expect(v.length()).toBe(5);
  });

  it('normalize()', () => {
    const v = new Vector4(1, 2, 2, 4);
    v.normalize();
    expect(v.x).closeTo(0.2, 4);
    expect(v.y).closeTo(0.4, 4);
    expect(v.z).closeTo(0.4, 4);
    expect(v.w).closeTo(0.8, 4);
  });

  it('normalize() does not change zero vector', () => {
    const v = Vector4.zero();
    v.normalize();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
    expect(v.w).toBe(0);
    expect(v.length()).toBe(0);
  });

  it('applyMatrix4()', () => {
    const v = Vector4.one();
    const m = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    v.applyMatrix4(m);
    expect(v.x).closeTo(28, PRECISION);
    expect(v.y).closeTo(32, PRECISION);
    expect(v.z).closeTo(36, PRECISION);
    expect(v.w).closeTo(40, PRECISION);
  });

  it('applyQuaternion()', () => {
    const v = Vector4.one();
    const axis = new Vector3(0, 0, 1);
    const angle = Math.PI / 2;
    const q = Quaternion.fromAxisAndAngle(axis, angle);
    v.applyQuaternion(q);
    expect(v.x).closeTo(-1, PRECISION);
    expect(v.y).closeTo(1, PRECISION);
    expect(v.z).closeTo(1, PRECISION);
    expect(v.w).closeTo(1, PRECISION);
  });
});
