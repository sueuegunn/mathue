interface FourArithmeticOperations<T> {
  add(other: T): T;
  subtract(other: T): T;
  multiply(scalar: number): T;
  divide(scalar: number): T;
}

export type {FourArithmeticOperations};
