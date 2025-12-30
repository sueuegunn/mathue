import {describe, it, expect} from 'vitest';
import {Vector1} from '../src/Vector1';

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
});
