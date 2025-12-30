import {describe, expect, it} from "vitest";
import {Vector3} from '../src/Vector3';

describe('Vector3', () => {
  it('gets x', () => {
    const v = new Vector3(1, 2, 3);
    expect(v.x).toBe(1);
  });

  it('sets x', () => {
    const v = Vector3.zero();
    v.x = 1;
    expect(v.x).toBe(1);
  });

  it('gets y', () => {
    const v = new Vector3(1, 2, 3);
    expect(v.y).toBe(2);
  });

  it('sets y', () => {
    const v = Vector3.zero();
    v.y = 1;
    expect(v.y).toBe(1);
  });

  it('gets z', () => {
    const v = new Vector3(1, 2, 3);
    expect(v.z).toBe(3);
  });

  it('sets z', () => {
    const v = Vector3.zero();
    v.z = 1;
    expect(v.z).toBe(1);
  });

  it('zero()', () => {
    const v = Vector3.zero();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
  });

  it('one()', () => {
    const v = Vector3.one();
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);
    expect(v.z).toBe(1);
  });

  it('clone()', () => {
    const value = new Vector3(1, 2, 3);
    const cloned = value.clone();
    expect(cloned.x).toBe(1);
    expect(cloned.y).toBe(2);
    expect(cloned.z).toBe(3);
  });

  it('isZero()', () => {
    const z = Vector3.zero();
    expect(z.isZero()).toBeTruthy();

    const o = Vector3.one();
    expect(o.isZero()).toBeFalsy();
  });

  it('set()', () => {
    const v = Vector3.zero();
    v.set(1, 2, 3);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
  });

  it('copy()', () => {
    const v1 = Vector3.zero();
    const v2 = new Vector3(1, 2, 3);
    v1.copy(v2);
    expect(v1.x).toBe(1);
    expect(v1.y).toBe(2);
    expect(v1.z).toBe(3);
  });

  it('add()', () => {
    const v1 = new Vector3(4, 5, 6);
    const v2 = new Vector3(7, 8, 9);
    v1.add(v2);
    expect(v1.x).toBe(11);
    expect(v1.y).toBe(13);
    expect(v1.z).toBe(15);
  });

  it('subtract()', () => {
    const v1 = new Vector3(4, 5, 6);
    const v2 = new Vector3(7, 8, 9);
    v1.subtract(v2);
    expect(v1.x).toBe(-3);
    expect(v1.y).toBe(-3);
    expect(v1.z).toBe(-3);
  });

  it('multiplyScalar()', () => {
    const v = new Vector3(4, 5, 6);
    v.multiplyScalar(2);
    expect(v.x).toBe(8);
    expect(v.y).toBe(10);
    expect(v.z).toBe(12);
  });

  it('divideScalar()', () => {
    const v = new Vector3(2, 4, 6);
    v.divideScalar(2);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
  });

  it('length()', () => {
    const v = new Vector3(2, 3, 6);
    expect(v.length()).toBe(7);
  });

  it('normalize()', () => {
    const v = new Vector3(2, 3, 6);
    v.normalize();
    expect(v.x).closeTo(2 / 7, 4);
    expect(v.y).closeTo(3 / 7, 4);
    expect(v.z).closeTo(6 / 7, 4);
  });

  it('normalize() does not change zero vector', () => {
    const v = Vector3.zero();
    v.normalize();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
    expect(v.length()).toBe(0);
  });

  it('cross()', () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, 6);
    v1.cross(v2);
    expect(v1.x).toBe(-3);
    expect(v1.y).toBe(6);
    expect(v1.z).toBe(-3);
  });

  it('crossTo()', () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, 6);
    const v3 = Vector3.zero();
    v1.crossTo(v2, v3);
    expect(v3.x).toBe(-3);
    expect(v3.y).toBe(6);
    expect(v3.z).toBe(-3);
  });
});
