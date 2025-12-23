interface AdditiveGroup<T> {
  add(other: T): T;
  subtract(other: T): T;
}

export type {AdditiveGroup};
