import {describe, it, expect} from 'vitest';
import {Quaternion} from '../../src/Quaternion';

describe('Quaternion', () => {
  it('gets a', () => {
    const q = Quaternion.identity();
    expect(q.a).toBe(1);
  });
});
