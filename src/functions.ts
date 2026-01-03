/**
 * Options of range function
 */
type RangeOptions = {
  /** inclusive bound (default `0`) */
  start?: number;
  /** step size (default `1`, must be non-zero) */
  step?: number;
};

/**
 * Creates a generator that yields numbers in a specified range
 * @param stop exclusive bound (sequence stops before reaching this)
 * @param options optional range configuration
 * @returns generator yielding numbers from `start` to `stop` (exclusive)
 * 
 * @example
 * ```ts
 * for (const i of range(5)) {
 *   console.log(i);
 * }
 * // 0, 1, 2, 3, 4
 * 
 * for (const i of range(10, { start: 2, step: 2 })) {
 *   console.log(i);
 * }
 * // 2, 4, 6, 8
 * 
 * for (const i of range(0, { start: 10, step: -3 })) {
 *   console.log(n);
 * }
 * // 10, 7, 4, 1
 * ```
 */
function* range(stop: number, options?: RangeOptions) {
  const start = options?.start ?? 0;
  const step = options?.step ?? 1;

  if (step === 0) {
    return;
  }

  if (step > 0 && start > stop) {
    return;
  }

  if (step < 0 && start < stop) {
    return;
  }

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

/**
 * Computes the sum of all values in an iterable of numbers
 * @param values iterable containing numbers to sum
 * @returns sum of all values (0 if empty)
 * 
 * @example
 * ```ts
 * sum([1, 2, 3]); // 6 (1+2+3)
 * ```
 */
function sum(values: Iterable<number>): number {
  let result = 0;
  for (const value of values) {
    result += value;
  }
  return result;
}

/**
 * Computes the sum of mapped values from an iterable, where `null` values contribute `0`.
 * @param values iterable of input values
 * @param callback mapping function `(value: T) => number | null`
 * @returns sum of non-null mapped values (0 if empty or all null)
 * 
 * @example
 * ```ts
 * sumMap([1, 2, 3], x => x * x); // 14 (1+4+9)
 * 
 * const objects = [{x: 1}, {x: 2}, {x: 3}];
 * sumMap(objects, obj => obj.x ?? null); // 6 (1+2+3)
 * ```
 */
function sumMap<T>(values: Iterable<T>, callback: (value: T) => number | null): number {
  let result = 0;
  for (const value of values) {
    result += callback(value) ?? 0;
  }
  return result;
}

export type {RangeOptions};
export {range, sum, sumMap};
