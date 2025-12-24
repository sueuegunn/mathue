import type { VectorDimension, TupleOf } from "./types";

interface Vector<D extends VectorDimension> {
  readonly dimension: D;
  readonly elements: TupleOf<number, D>;
}

export type {Vector};
