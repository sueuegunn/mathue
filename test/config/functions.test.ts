import {describe, expect, it} from "vitest";
import {range, sum, sumMap} from '../../src/functions';

describe('functions', () => {
  describe('range()', () => {
    it('empty iterator when step=0', () => {
      let count = 0;
      for (const _ of range(8, {step: 0})) {
        count++;
      }
      expect(count).toBe(0);
    });

    it('empty iterator when step>0 && start>stop', () => {
      let count = 0;
      for (const _ of range(8, {step:1, start:10})) {
        count++;
      }
      expect(count).toBe(0);
    });

    it('empty iterator when step<0 && start<stop', () => {
      let count = 0;
      for (const _ of range(8, {step:-1, start:7})) {
        count++;
      }
      expect(count).toBe(0);
    });

    it('some iterator', () => {
      let count = 0;
      for (const _ of range(8, {start:2, step: 3})) {
        count++;
      }
      expect(count).toBe(2);
    });
  });

  describe('sum()', () => {
    it('0 when empty array', () => {
      expect(sum([])).toBe(0);
    });

    it('calculates sum', () => {
      expect(sum([1, 2])).toBe(3);
    });
  });

  describe('sumMap()', () => {
    it('0 when empty array', () => {
      expect(sumMap([], () => 1)).toBe(0);
    });

    it('calculates sum', () => {
      const humans = [{name: 'adam', age: 10}, {name: 'eve', age: 20}];
      expect(sumMap(humans, (h) => h.age)).toBe(30);
    });
  });
});
