interface Scalable<T> {
  multiplyScalar(scalar: number): T;
  divideScalar(scalar: number): T;
}

export type {Scalable};
