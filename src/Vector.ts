import type { Dimension, TupleOf } from "./types";

interface Vector<D extends Dimension> {
  readonly dimension: D;
  readonly elements: TupleOf<number, D>;
}

export type {Vector};
