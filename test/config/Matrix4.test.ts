import { describe, it, expect } from "vitest";
import {Matrix4} from '../../src/Matrix4';
import { Vector3 } from "../../src/Vector3";

describe('Matrix4', () => {
  it('identity()', () => {
    const m = Matrix4.identity();
    expect(m.elements[0]).toBe(1);
  });
});
