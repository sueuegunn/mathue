import type {LengthOfMatrix, MatrixOrder, TupleOf} from './types';

interface Matrix<Order extends MatrixOrder> {
  readonly order: Order;
  readonly elements: TupleOf<number, LengthOfMatrix<Order>>;
}

export type {Matrix};
