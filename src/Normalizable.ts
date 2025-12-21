interface Normalizable<T> {
  length(): number;
  normalize(): T;
}

export type {Normalizable};
