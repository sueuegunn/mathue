import { describe, it, expect } from "vitest";
import { Matrix3 } from '../src/Matrix3';
import { range } from "../src/functions";

const PRECISION = 8;

describe('Matrix3', () => {
  it('identity()', () => {
    const m = Matrix3.identity();

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m.elements[index]).toBe(1);
        } else {
          expect(m.elements[index]).toBe(0);
        }
      }
    }
  });

  it('zero()', () => {
    const m = Matrix3.zero();

    const {order} = m;
    for (const index of range(order ** 2)) {
      expect(m.elements[index]).toBe(0);
    }
  });

  it('clone()', () => {
    const m = Matrix3.identity();
    const c = m.clone();

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m.elements[index]).toBe(1);
        } else {
          expect(m.elements[index]).toBe(0);
        }
      }
    }
  });

  it('set()', () => {
    const m = Matrix3.zero();
    m.set(1, 2, 3, 4, 5, 6, 7, 8, 9);

    const {order} = m;
    for (const index of range(order ** 2)) {
      expect(m.elements[index]).toBe(index + 1);
    }
  });

  it('copy()', () => {
    const m = Matrix3.zero();
    m.copy(Matrix3.identity());

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m.elements[index]).toBe(1);
        } else {
          expect(m.elements[index]).toBe(0);
        }
      }
    }
  });

  it('add()', () => {
    const m1 = Matrix3.identity();
    const m2 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    m1.add(m2);

    const {order} = m1;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m1.elements[index]).toBe(index + 1 + 1);
        } else {
          expect(m1.elements[index]).toBe(index + 1);
        }
      }
    }
  });

  it('subtract()', () => {
    const m1 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const m2 = Matrix3.identity();
    m1.subtract(m2);

    const {order} = m1;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m1.elements[index]).toBe(index);
        } else {
          expect(m1.elements[index]).toBe(index + 1);
        }
      }
    }
  });

  it('multiplyScalar()', () => {
    const m = Matrix3.identity();
    m.multiplyScalar(2);

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m.elements[index]).toBe(2);
        } else {
          expect(m.elements[index]).toBe(0);
        }
      }
    }
  });

  it('divideScalar()', () => {
    const m = Matrix3.identity();
    m.divideScalar(2);

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m.elements[index]).toBeCloseTo(0.5, PRECISION);
        } else {
          expect(m.elements[index]).toBe(0);
        }
      }
    }
  });

  it('multiply()', () => {
    const m1 = Matrix3.identity();
    const m2 = Matrix3.identity();
    m1.multiply(m2);

    const {order} = m1;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m1.elements[index]).toBe(1);
        } else {
          expect(m1.elements[index]).toBe(0);
        }
      }
    }
  });

  it('determinant()', () => {
    const m = Matrix3.identity();
    expect(m.determinant()).toBe(1);
  });

  it('invert()', () => {
    const m = Matrix3.identity();
    const i = m.invert();

    if (!i) {
      expect.fail();
    }
    
    const {order} = i;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(i.elements[index]).toBeCloseTo(1, PRECISION);
        } else {
          expect(i.elements[index]).toBeCloseTo(0, PRECISION);
        }
      }
    }
  });

  it('invert() does not calculates zero matrix', () => {
    const m = Matrix3.zero();
    const i = m.invert();
    expect(i).toBeNull();
  });

  it('transpose()', () => {
    const m = new Matrix3(0, 1, 2, 3, 4, 5, 6, 7, 8);
    m.transpose();

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const element = m.elements[order * column + row];
        const expected = order * row + column;
        expect(element).toBe(expected);
      }
    }
  });

  it('divide()', () => {
    const m1 = Matrix3.identity();
    const m2 = Matrix3.identity();
    const result = m1.divide(m2);
    expect(result).toBeTruthy();

    const {order} = m1;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m1.elements[index]).toBeCloseTo(1, PRECISION);
        } else {
          expect(m1.elements[index]).toBeCloseTo(0, PRECISION);
        }
      }
    }
  });

  it('divide() does not calculates zero matrix', () => {
    const m1 = Matrix3.identity();
    const m2 = Matrix3.zero();
    const result = m1.divide(m2);
    expect(result).toBeNull();
  });
});