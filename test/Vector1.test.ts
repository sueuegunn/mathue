import { describe, it, expect } from 'vitest';
import { Vector1 } from '../src/Vector1';
import { Matrix3 } from '../src/Matrix3';
import { Matrix4 } from '../src/Matrix4';
import { Quaternion } from '../src/Quaternion';
import { Vector3 } from '../src/Vector3';

const PRECISION = 6;

describe('Vector1', () => {
  it('gets x', () => {
    const v = new Vector1(2);
    expect(v.x).toBe(2);
  });

  it('sets x', () => {
    const v = Vector1.zero();
    v.x = 1;
    expect(v.x).toBe(1);
  });

  it('zero()', () => {
    const v = Vector1.zero();
    expect(v.x).toBe(0);
  });

  it('one()', () => {
    const v = Vector1.one();
    expect(v.x).toBe(1);
  });

  it('clone()', () => {
    const v = new Vector1(3);
    const c = v.clone();
    expect(c.x).toBe(3);
  });

  it('isZero()', () => {
    const z = Vector1.zero();
    expect(z.isZero()).toBeTruthy();

    const o = Vector1.one();
    expect(o.isZero()).toBeFalsy();
  });

  it('set()', () => {
    const v = Vector1.zero();
    v.set(1);
    expect(v.x).toBe(1);
  });

  it('copy()', () => {
    const v1 = new Vector1(1);
    const v2 = new Vector1(2);
    v1.copy(v2);
    expect(v1.x).toBe(2);
  });

  it('add()', () => {
    const v1 = new Vector1(1);
    const v2 = new Vector1(2);
    v1.add(v2);
    expect(v1.x).toBe(3);
  });

  it('subtract()', () => {
    const v1 = new Vector1(1);
    const v2 = new Vector1(2);
    v1.subtract(v2);
    expect(v1.x).toBe(-1);
  });

  it('multiplyScalar()', () => {
    const v = new Vector1(1);
    v.multiplyScalar(2);
    expect(v.x).toBe(2);
  });

  it('divideScalar()', () => {
    const v = new Vector1(2);
    v.divideScalar(2);
    expect(v.x).toBe(1);
  });

  it('length()', () => {
    const v = new Vector1(2);
    expect(v.length()).toBe(2);
  });

  it('normalize()', () => {
    const v = new Vector1(3);
    v.normalize();
    expect(v.x).toBe(1);
  });

  it('applyMatrix3()', () => {
    const v = Vector1.one();
    const m = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    v.applyMatrix3(m);
    expect(v.x).closeTo(1, PRECISION);
  });

  it('applyMatrix4()', () => {
    const v = Vector1.one();
    const m = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    v.applyMatrix4(m);
    expect(v.x).closeTo(1, PRECISION);
  });

  it('applyQuaternion()', () => {
    const v = Vector1.one();
    const axis = new Vector3(0, 0, 1);
    const angle = Math.PI / 2;
    const q = Quaternion.fromAxisAndAngle(axis, angle);
    v.applyQuaternion(q);
    expect(v.x).closeTo(0, PRECISION);
  });
});
