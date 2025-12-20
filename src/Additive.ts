interface Additive<T> {
  add(other: T): T;
  subtract(other: T): T;
}

export type {Additive};
