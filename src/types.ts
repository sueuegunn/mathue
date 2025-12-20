type Dimension = 1 | 2 | 3 | 4;

type MatrixRank = 2 | 3 | 4;

/**
 * @example
 * ```ts
 * type Length3x3 = LengthOfMatrix<3>; // 9
 * type Length4x4 = LengthOfMatrix<4>; // 16 
 * ```
 */
type LengthOfMatrix<R extends MatrixRank>
  = R extends 2 ? 4
  : R extends 3 ? 9
  : R extends 4 ? 16
  : never;

/**
 * @example
 * ```ts
 * type NumberTuple2 = TupleOf<number, 2>; // [number, number]
 * ```
 */
type TupleOf<Ele, Len extends number, Tup extends Ele[] = []> =
  Tup['length'] extends Len ? Tup : TupleOf<Ele, Len, [...Tup, Ele]>;

export type {Dimension, MatrixRank, LengthOfMatrix, TupleOf};
