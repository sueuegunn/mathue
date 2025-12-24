import { describe, expect, it } from "vitest";
import {Vector4} from '../../src/Vector4';

describe('Vector4', () => {
  it('gets x', () => {
    const v = new Vector4(1, 2, 3, 4);
    expect(v.x).toBe(1);
  });
});
