import { describe, it, expect } from 'vitest';
import { PolarCoordinate3 } from '../src/PolarCoordinate3';
import { Vector3 } from '../src/Vector3';

const PRECISION = 8;

describe('PolarCoordinate3', () => {
  it('gets phi', () => {
    const p = new PolarCoordinate3(Math.PI, 0, 1);
    expect(p.phi).toBeCloseTo(Math.PI, PRECISION);
  });

  it('sets phi', () => {
    const p = new PolarCoordinate3(Math.PI, 0, 1);
    p.phi = 0;
    expect(p.phi).toBeCloseTo(0, PRECISION);
  });

  it('gets theta', () => {
    const p = new PolarCoordinate3(0, Math.PI, 1);
    expect(p.theta).toBeCloseTo(Math.PI, PRECISION);
  });

  it('sets theta', () => {
    const p = new PolarCoordinate3(0, Math.PI, 1);
    p.theta = 0;
    expect(p.theta).toBeCloseTo(0, PRECISION);
  });

  it('gets radius', () => {
    const p = new PolarCoordinate3(0, Math.PI, 1);
    expect(p.radius).toBeCloseTo(1, PRECISION);
  });

  it('sets radius', () => {
    const p = new PolarCoordinate3(0, Math.PI, 1);
    p.radius = 2;
    expect(p.radius).toBeCloseTo(2, PRECISION);
  });

  it('toVector3()', () => {
    const p = new PolarCoordinate3(Math.PI, Math.PI / 2, 1);
    const v = Vector3.zero();
    p.toVector3(v);
    expect(v.x).toBeCloseTo(-1, PRECISION);
    expect(v.y).toBeCloseTo(0, PRECISION);
    expect(v.z).toBeCloseTo(0, PRECISION);

    p.phi = Math.PI / 4;
    p.theta = Math.PI  / 4;
    p.radius = 2;
    p.toVector3(v);
    expect(v.x).toBeCloseTo(1, PRECISION);
    expect(v.y).toBeCloseTo(1, PRECISION);
    expect(v.z).toBeCloseTo(Math.SQRT2, PRECISION);
  });

  it('toTangentZ()', () => {
    const p = new PolarCoordinate3(Math.PI, Math.PI / 2, 1);
    const v = Vector3.zero();
    p.toTangentZ(v);
    expect(v.x).toBeCloseTo(0, PRECISION);
    expect(v.y).toBeCloseTo(0, PRECISION);
    expect(v.z).toBeCloseTo(1, PRECISION);

    p.phi = Math.PI / 4;
    p.theta = Math.PI  / 4;
    p.radius = 2;
    p.toTangentZ(v);
    expect(v.x).toBeCloseTo(-0.5, PRECISION);
    expect(v.y).toBeCloseTo(-0.5, PRECISION);
    expect(v.z).toBeCloseTo(Math.SQRT1_2, PRECISION);
  });
});
