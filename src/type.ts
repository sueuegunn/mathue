type Dimension = 1 | 2 | 3 | 4;

type NumberTupleOf<Dim extends Dimension, Tup extends number[] = []> =
  Tup['length'] extends Dim ? Tup : NumberTupleOf<Dim, [...Tup, number]>;

interface Vector<Dim extends Dimension> {
  readonly dimension: Dim;
  readonly elements: NumberTupleOf<Dim>;
}

export type {Dimension, Vector};