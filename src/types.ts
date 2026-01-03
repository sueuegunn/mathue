type VectorDimension = 1 | 2 | 3 | 4;

type MatrixOrder = 3 | 4;

/**
 * @example
 * ```ts
 * type NumberTuple2 = TupleOf<number, 2>; // [number, number]
 * ```
 */
type TupleOf<Ele, Len extends number, Tup extends Ele[] = []> =
  Tup['length'] extends Len ? Tup : TupleOf<Ele, Len, [...Tup, Ele]>;

export type {VectorDimension, MatrixOrder, TupleOf};
