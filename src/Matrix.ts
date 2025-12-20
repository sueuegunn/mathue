import type {LengthOfMatrix, MatrixRank, TupleOf} from './types';

interface Matrix<R extends MatrixRank> {
  readonly rank: R;
  readonly elements: TupleOf<number, LengthOfMatrix<R>>;
}

export type {Matrix};
