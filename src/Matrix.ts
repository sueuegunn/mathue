import type {MatrixOrder} from './types';

interface Matrix<Order extends MatrixOrder> {
  readonly order: Order;
  readonly elements: Float32Array;
}

export type {Matrix};
