import { describe, it, expect } from "vitest";
import {Matrix4} from '../src/Matrix4';
import { Vector3 } from "../src/Vector3";
import { range } from "../src/functions";
import { Quaternion } from "../src/Quaternion";

const PRECISION = 6;

describe('Matrix4', () => {
  it('identity()', () => {
    const m = Matrix4.identity();

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
    const m = Matrix4.zero();

    const {order} = m;
    for (const index of range(order ** 2)) {
      expect(m.elements[index]).toBe(0);
    }
  });

  it('clone()', () => {
    const m = Matrix4.identity();
    const c = m.clone();

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(c.elements[index]).toBe(1);
        } else {
          expect(c.elements[index]).toBe(0);
        }
      }
    }
  });

  it('set()', () => {
    const m = Matrix4.zero();
    m.set(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    
    const {order} = m;
    for (const index of range(order ** 2)) {
      expect(m.elements[index]).toBe(index + 1);
    }
  });

  it('copy()', () => {
    const m = Matrix4.zero();
    m.copy(Matrix4.identity());
    
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

  it('setRotation()', () => {
    const axis = new Vector3(1, 0, 0);
    const radian = Math.PI / 2;
    const q = Quaternion.fromAxisAndAngle(axis, radian);
    const m = Matrix4.identity();
    m.setRotation(q);
    const v = new Vector3(0, 1, 0);
    v.applyMatrix4(m);
    expect(v.x).toBeCloseTo(0, PRECISION);
    expect(v.y).toBeCloseTo(0, PRECISION);
    expect(v.z).toBeCloseTo(1, PRECISION);
  });

  it('add()', () => {
    const m1 = Matrix4.identity();
    const m2 = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
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
    const m1 = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const m2 = Matrix4.identity();
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
    const m = Matrix4.identity();
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
    const m = Matrix4.identity();
    m.divideScalar(2);

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m.elements[index]).closeTo(0.5, PRECISION);
        } else {
          expect(m.elements[index]).toBe(0);
        }
      }
    }
  });

  it('multiply()', () => {
    const m1 = Matrix4.identity();
    const m2 = Matrix4.identity();
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
    const m = Matrix4.identity();
    expect(m.determinant()).toBe(1);
  });

  it('invert()', () => {
    const m = Matrix4.identity();
    const i = m.invert();

    if (!i) {
      expect.fail();
    }
    
    const {order} = i;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(i.elements[index]).closeTo(1, PRECISION);
        } else {
          expect(i.elements[index]).closeTo(0, PRECISION);
        }
      }
    }
  });

  it('invert() does not calculates zero matrix', () => {
    const m = Matrix4.zero();
    const i = m.invert();
    expect(i).toBeNull();
  });

  it('transpose()', () => {
    const m = new Matrix4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
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
    const m1 = Matrix4.identity();
    const m2 = Matrix4.identity();
    const result = m1.divide(m2);
    expect(result).toBeTruthy();

    const {order} = m1;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m1.elements[index]).closeTo(1, PRECISION);
        } else {
          expect(m1.elements[index]).closeTo(0, PRECISION);
        }
      }
    }
  });

  it('divide() does not calculates zero matrix', () => {
    const m1 = Matrix4.identity();
    const m2 = Matrix4.zero();
    const result = m1.divide(m2);
    expect(result).toBeNull();
  });

  it('setScale()', () => {
    const m = Matrix4.identity();
    m.setScale(new Vector3(2, 3, 4));

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          const e = row === 3 ? 1 : row + 2;
          expect(m.elements[index]).toBeCloseTo(e, PRECISION);
        } else {
          expect(m.elements[index]).toBeCloseTo(0, PRECISION);
        }
      }
    }
  });

  it('setTranslation()', () => {
    const m = Matrix4.identity();
    m.setTranslation(new Vector3(2, 3, 4));

    const {order} = m;
    for (const row of range(order)) {
      for (const column of range(order)) {
        const index = row * order + column;
        if (row === column) {
          expect(m.elements[index]).toBeCloseTo(1, PRECISION);
        } else if (row === 3) {
          const e = column === 3 ? 1 : column + 2;
          expect(m.elements[index]).toBeCloseTo(e, PRECISION);
        } else {
          expect(m.elements[index]).toBeCloseTo(0, PRECISION);
        }
      }
    }
  });

  it('lookAt()', () => {
    const position = new Vector3(0, -1, 0);
    const target = Vector3.zero();
    const up = new Vector3(0, 0, 1);
    const m = Matrix4.identity();
    m.lookAt(position, target, up);

    const {order} = m;
    for (const index of range(order ** 2)) {
      const element = m.elements[index];
      switch(index) {
        case 0:
        case 9:
        case 15:
          expect(element).closeTo(1, PRECISION);
          continue;
        case 6:
        case 14:
          expect(element).closeTo(-1, PRECISION);
          continue;
        default:
          expect(element).closeTo(0, PRECISION);
      }
    }
  });

  it('lookAt() does not mutate this when position equals target', () => {
    const position = Vector3.one();
    const target = Vector3.one();
    const up = new Vector3(0, 0, 1);
    const m = Matrix4.zero();
    m.lookAt(position, target, up);

    const {order} = m;
    for (const index of range(order ** 2)) {
      expect(m.elements[index]).toBe(0);
    }
  });

  it('orthographic()', () => {
    const left = -1;
    const right = 1;
    const bottom = -1;
    const top = 1;
    const near = 0.1;
    const far = 2;
    const m = Matrix4.zero();
    m.orthographic(left, right, bottom, top, near, far);

    const {order} = m;
    for (const index of range(order ** 2)) {
      const element = m.elements[index];
      switch(index) {
        case 0:
        case 5:
        case 15:
          expect(element).toBeCloseTo(1, PRECISION);
          continue;
        case 10:
          expect(element).toBeCloseTo(-2 / 1.9, PRECISION);
          continue;
        case 14:
          expect(element).toBeCloseTo(-2.1 / 1.9, PRECISION);
          continue;
        default:
          expect(element).toBeCloseTo(0, PRECISION);
      }
    }
  });

  it('orthographic() for WebGPU', () => {
    const left = -1;
    const right = 1;
    const bottom = -1;
    const top = 1;
    const near = 0.1;
    const far = 2;
    const m = Matrix4.zero();
    m.orthographic(left, right, bottom, top, near, far, {depthZeroToOne: true});

    const {order} = m;
    for (const index of range(order ** 2)) {
      const element = m.elements[index];
      switch(index) {
        case 0:
        case 5:
        case 15:
          expect(element).toBeCloseTo(1, PRECISION);
          continue;
        case 10:
          expect(element).toBeCloseTo(-1 / 1.9, PRECISION);
          continue;
        case 14:
          expect(element).toBeCloseTo(-0.1 / 1.9, PRECISION);
          continue;
        default:
          expect(element).toBeCloseTo(0, PRECISION);
      }
    }
  });

  it('perspective()', () => {
    const fov = Math.PI / 2;
    const near = 0.1;
    const far = 2;
    const aspect = 1;
    const m = Matrix4.zero();
    m.perspective(fov, near, far, aspect);

    const {order} = m;
    for (const index of range(order ** 2)) {
      const element = m.elements[index];
      switch(index) {
        case 0:
        case 5:
          expect(element).toBeCloseTo(1, PRECISION);
          continue;
        case 10:
          expect(element).toBeCloseTo(-2.1 / 1.9, PRECISION);
          continue;
        case 11:
          expect(element).toBeCloseTo(-1, PRECISION);
          continue;
        case 14:
          expect(element).toBeCloseTo(-0.4 / 1.9, PRECISION);
          continue;
        default:
          expect(element).toBeCloseTo(0, PRECISION);
      }
    }
  });

  it('perspective() for WebGPU', () => {
    const fov = Math.PI / 2;
    const near = 0.1;
    const far = 2;
    const aspect = 1;
    const m = Matrix4.zero();
    m.perspective(fov, near, far, aspect, {depthZeroToOne: true});

    const expected10 = -far / (far - near);
    const {order} = m;
    for (const index of range(order ** 2)) {
      const element = m.elements[index];
      switch(index) {
        case 0:
        case 5:
          expect(element).closeTo(1, PRECISION);
          continue;
        case 10:
          expect(element).closeTo(expected10, PRECISION);
          continue;
        case 11:
          expect(element).closeTo(-1, PRECISION);
          continue;
        case 14:
          expect(element).closeTo(expected10 / 10, PRECISION);
          continue;
        default:
          expect(element).closeTo(0, PRECISION);
      }
    }
  });

  it('perspective() when far=Infinity', () => {
    const fov = Math.PI / 2;
    const near = 0.1;
    const far = Infinity;
    const aspect = 1;
    const m = Matrix4.zero();
    m.perspective(fov, near, far, aspect);

    const {order} = m;
    for (const index of range(order ** 2)) {
      const element = m.elements[index];
      switch(index) {
        case 0:
        case 5:
          expect(element).toBeCloseTo(1, PRECISION);
          continue;
        case 10:
        case 11:
          expect(element).toBeCloseTo(-1, PRECISION);
          continue;
        case 14:
          expect(element).toBeCloseTo(-0.2, PRECISION);
          continue;
        default:
          expect(element).toBeCloseTo(0, PRECISION);
      }
    }
  });

  it('calculates model matrix', () => {
    const position = new Vector3(1, 2, 3);
    const axis = new Vector3(0, 0, 1);
    const angle = Math.PI / 2;
    const rotation = Quaternion.fromAxisAndAngle(axis, angle);
    const scale = new Vector3(2, 3, 4);

    const model = Matrix4.identity();
    model
      .multiplyTranslation(position)
      .multiplyRotation(rotation)
      .multiplyScale(scale);

    const vertex = Vector3.one();
    vertex.applyMatrix4(model);

    expect(vertex.x).toBeCloseTo(-2, PRECISION);
    expect(vertex.y).toBeCloseTo(4, PRECISION);
    expect(vertex.z).toBeCloseTo(7, PRECISION);
  });
});

