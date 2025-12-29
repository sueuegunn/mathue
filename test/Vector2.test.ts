import {describe, it, expect} from 'vitest';
import {Vector2} from '../src/Vector2';

describe('Vector2', () => {
  it('gets x', () => {
    const v = new Vector2(1, 2);
    expect(v.x).toBe(1);
  });

  it('sets x', () => {
    const v = Vector2.zero();
    v.x = 1;
    expect(v.x).toBe(1);
  });

  it('gets y', () => {
    const v = new Vector2(1, 2);
    expect(v.y).toBe(2);
  });

  it('sets y', () => {
    const v = Vector2.zero();
    v.y = 1;
    expect(v.y).toBe(1);
  });

  it('zero()', () => {
    const v = Vector2.zero();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  });

  it('one()', () => {
    const v = Vector2.one();
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);
  })

  it('clone()', () => {
    const v = new Vector2(1, 2);
    const c = v.clone();
    expect(c.x).toBe(1);
    expect(c.y).toBe(2);
  });

  it('isZero()', () => {
    const z = Vector2.zero();
    const o = Vector2.one();
    expect(z.isZero()).toBeTruthy();
    expect(o.isZero()).toBeFalsy();
  });

  it('setValues()', () => {
    const v = Vector2.zero();
    v.setValues(1, 2);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
  });

  it('set()', () => {
    const v1 = Vector2.zero();
    const v2 = new Vector2(1, 2);
    v1.set(v2);
    expect(v1.x).toBe(1);
    expect(v1.y).toBe(2);
  });

  it('add()', () => {
    const v1 = new Vector2(3, 4);
    const v2 = new Vector2(5, 6);
    v1.add(v2);
    expect(v1.x).toBe(8);
    expect(v1.y).toBe(10);
  });

  it('subtract()', () => {
    const v1 = new Vector2(3, 4);
    const v2 = new Vector2(5, 6);
    v1.subtract(v2);
    expect(v1.x).toBe(-2);
    expect(v1.y).toBe(-2);
  });

  it('multiplyScalar()', () => {
    const v = new Vector2(1, 2);
    v.multiplyScalar(2);
    expect(v.x).toBe(2);
    expect(v.y).toBe(4);
  });

  it('divideScalar()', () => {
    const v = new Vector2(2, 4);
    v.divideScalar(2);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
  });

  it('length()', () => {
    const v = new Vector2(3, 4);
    expect(v.length()).toBe(5);
  });

  it('normalize()', () => {
    const v = new Vector2(3, 4);
    v.normalize();
    expect(v.x).toBe(0.6);
    expect(v.y).toBe(0.8);
    expect(v.length()).toBe(1);
  });

  it('normalize() does not change zero vector', () => {
    const v = Vector2.zero();
    v.normalize();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.length()).toBe(0);
  });

  it('rotate()', () => {
    const v = new Vector2(1, 0);
    v.rotate(Math.PI / 2);
    expect(v.x).closeTo(0, 4);
    expect(v.y).closeTo(0, 4);
  });
});
