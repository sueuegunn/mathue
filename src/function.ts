type RangeOptions = {
  start?: number;
  step?: number;
};

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

function sum(values: Iterable<number>): number {
  let result = 0;
  for (const value of values) {
    result += value;
  }
  return result;
}

function sumMap<T>(values: Iterable<T>, callback: (value: T) => number | null): number {
  let result = 0;
  for (const value of values) {
    result += callback(value) ?? 0;
  }
  return result;
}

export type {RangeOptions};
export {range, sum, sumMap};
