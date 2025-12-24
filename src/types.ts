type VectorDimension = 1 | 2 | 3 | 4;

type MatrixOrder = 2 | 3 | 4;

/**
 * @example
 * ```ts
 * type Length3x3 = LengthOfMatrix<3>; // 9
 * type Length4x4 = LengthOfMatrix<4>; // 16 
 * ```
 */
type LengthOfMatrix<Order extends MatrixOrder>
  = Order extends 2 ? 4
  : Order extends 3 ? 9
  : Order extends 4 ? 16
  : never;

/**
 * @example
 * ```ts
 * type NumberTuple2 = TupleOf<number, 2>; // [number, number]
 * ```
 */
type TupleOf<Ele, Len extends number, Tup extends Ele[] = []> =
  Tup['length'] extends Len ? Tup : TupleOf<Ele, Len, [...Tup, Ele]>;

export type {VectorDimension, MatrixOrder, LengthOfMatrix, TupleOf};
