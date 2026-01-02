import {describe, it, expect} from 'vitest';
import {Quaternion} from '../src/Quaternion';
import { Vector3 } from '../src/Vector3';

const PRECISION = 8;

describe('Quaternion', () => {
  it('gets a', () => {
    const q = Quaternion.identity();
    expect(q.a).toBe(1);
  });

  it('gets b', () => {
    const q = Quaternion.identity();
    expect(q.b).toBe(0);
  });

  it('gets c', () => {
    const q = Quaternion.identity();
    expect(q.c).toBe(0);
  });

  it('gets d', () => {
    const q = Quaternion.identity();
    expect(q.d).toBe(0);
  });

  it('identity()', () => {
    const q = Quaternion.identity();
    expect(q.a).toBe(1);
    expect(q.b).toBe(0);
    expect(q.c).toBe(0);
    expect(q.d).toBe(0);
  });

  it('fromAxisAndAngle()', () => {
    const axis = new Vector3(0, 1, 0);
    const angle = Math.PI / 2;
    const q = Quaternion.fromAxisAndAngle(axis, angle);
    const v = new Vector3(0, 0, 1);
    v.applyQuaternion(q);
    expect(v.x).closeTo(1, PRECISION);
    expect(v.x).closeTo(0, PRECISION);
    expect(v.x).closeTo(0, PRECISION);
  });

  it('fromAxisAndAngle() returns identity when axis is zero', () => {
    const axis = Vector3.zero();
    const angle = Math.PI;
    const q = Quaternion.fromAxisAndAngle(axis, angle);
    expect(q.a).toBe(1);
    expect(q.b).toBe(0);
    expect(q.c).toBe(0);
    expect(q.d).toBe(0);
  });

  it('clone()', () => {
    const q = Quaternion.identity();
    const c = q.clone();
    expect(c.a).toBe(1);
    expect(c.b).toBe(0);
    expect(c.c).toBe(0);
    expect(c.d).toBe(0);
  });

  it('set()', () => {
    const q = Quaternion.identity();
    q.set(2, 3, 4, 5);
    expect(q.a).toBe(2);
    expect(q.b).toBe(3);
    expect(q.c).toBe(4);
    expect(q.d).toBe(5);
  });

  it('copy()', () => {
    const q1 = Quaternion.identity();
    const q2 = new Quaternion(2, 3, 4, 5);
    q1.copy(q2);
    expect(q1.a).toBe(2);
    expect(q1.b).toBe(3);
    expect(q1.c).toBe(4);
    expect(q1.d).toBe(5);
  });

  it('setIdentity()', () => {
    const q = new Quaternion(2, 3, 4, 5);
    q.setIdentity();
    expect(q.a).toBe(1);
    expect(q.b).toBe(0);
    expect(q.c).toBe(0);
    expect(q.d).toBe(0);
  });

  it('norm()', () => {
    const q = new Quaternion(1, 2, 2, 4);
    expect(q.norm()).closeTo(5, PRECISION);
  });

  it('conjugate()', () => {
    const q = new Quaternion(2, 3, 4, 5);
    q.conjugate();
    expect(q.a).toBe(2);
    expect(q.b).toBe(-3);
    expect(q.c).toBe(-4);
    expect(q.d).toBe(-5);
  });

  it('add()', () => {
    const q1 = new Quaternion(1, 2, 3, 4);
    const q2 = new Quaternion(5, 6, 7, 8);
    q1.add(q2);
    expect(q1.a).toBe(6);
    expect(q1.b).toBe(8);
    expect(q1.c).toBe(10);
    expect(q1.d).toBe(12);
  });

  it('subtract()', () => {
    const q1 = new Quaternion(1, 2, 3, 4);
    const q2 = new Quaternion(5, 6, 7, 8);
    q1.subtract(q2);
    expect(q1.a).toBe(-4);
    expect(q1.b).toBe(-4);
    expect(q1.c).toBe(-4);
    expect(q1.d).toBe(-4);
  });

  it('multiply()', () => {
    const i = new Quaternion(0, 1, 0, 0);
    const j = new Quaternion(0, 0, 1, 0);
    const k = new Quaternion(0, 0, 0, 1);

    const ij = i.clone().multiply(j);
    const ji = j.clone().multiply(i);

    expect(ij.a - k.a).closeTo(0, PRECISION);
    expect(ij.b - k.b).closeTo(0, PRECISION);
    expect(ij.c - k.c).closeTo(0, PRECISION);
    expect(ij.d - k.d).closeTo(0, PRECISION);
    
    expect(ji.a + k.a).closeTo(0, PRECISION);
    expect(ji.b + k.b).closeTo(0, PRECISION);
    expect(ji.c + k.c).closeTo(0, PRECISION);
    expect(ji.d + k.d).closeTo(0, PRECISION);
  });

  it('invert()', () => {
    const i = new Quaternion(0, 1, 0, 0);
    const result = i.invert();
    if (!result) {
      expect.fail();
    }
    expect(i.a).closeTo(0, PRECISION);
    expect(i.b).closeTo(-1, PRECISION);
    expect(i.c).closeTo(0, PRECISION);
    expect(i.d).closeTo(0, PRECISION);
  });

  it('invert() returns null when zero quaternion', () => {
    const q = new Quaternion(0, 0, 0, 0);
    expect(q.invert()).toBeNull();
  });

  it('divide()', () => {
    const q = Quaternion.identity();
    q.divide(Quaternion.identity());
    expect(q.a).closeTo(1, PRECISION);
    expect(q.b).closeTo(0, PRECISION);
    expect(q.c).closeTo(0, PRECISION);
    expect(q.d).closeTo(0, PRECISION);
  });

  it('divide() returns null when zero quaternion', () => {
    const q = Quaternion.identity();
    const result = q.divide(new Quaternion(0, 0, 0, 0));
    expect(result).toBeNull();
  });

  it('multiplyScalar()', () => {
    const q = new Quaternion(1, 2, 3, 4);
    q.multiplyScalar(2);
    expect(q.a).closeTo(2, PRECISION);
    expect(q.b).closeTo(4, PRECISION);
    expect(q.c).closeTo(6, PRECISION);
    expect(q.d).closeTo(8, PRECISION);
  });

  it('divideScalar()', () => {
    const q = new Quaternion(2, 4, 6, 8);
    q.divideScalar(2);
    expect(q.a).closeTo(1, PRECISION);
    expect(q.b).closeTo(2, PRECISION);
    expect(q.c).closeTo(3, PRECISION);
    expect(q.d).closeTo(4, PRECISION);
  });

  it('rotateX()', () => {
    const q = Quaternion.identity();
    q.rotateX(Math.PI / 2);
    expect(q.a).closeTo(Math.SQRT1_2, PRECISION);
    expect(q.b).closeTo(Math.SQRT1_2, PRECISION);
    expect(q.c).closeTo(0, PRECISION);
    expect(q.d).closeTo(0, PRECISION);
  });

  it('rotateY()', () => {
    const q = Quaternion.identity();
    q.rotateY(Math.PI / 2);
    expect(q.a).closeTo(Math.SQRT1_2, PRECISION);
    expect(q.b).closeTo(0, PRECISION);
    expect(q.c).closeTo(Math.SQRT1_2, PRECISION);
    expect(q.d).closeTo(0, PRECISION);
  });

  it('rotateZ()', () => {
    const q = Quaternion.identity();
    q.rotateZ(Math.PI / 2);
    expect(q.a).closeTo(Math.SQRT1_2, PRECISION);
    expect(q.b).closeTo(0, PRECISION);
    expect(q.c).closeTo(0, PRECISION);
    expect(q.d).closeTo(Math.SQRT1_2, PRECISION);
  });
});
