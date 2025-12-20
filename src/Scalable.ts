interface Scalable<T> {
  scalarMultiply(scalar: number): T;
  scalarDivide(scalar: number): T;
}

export type {Scalable};
