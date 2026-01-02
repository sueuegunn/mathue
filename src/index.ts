import type { VectorDimension, LengthOfMatrix, MatrixOrder, TupleOf } from "./types";
import type { AdditiveGroup } from "./AdditiveGroup";
import type { Clonable } from "./Clonable";
import type { Matrix } from "./Matrix";
import type { MultiplicativeMonoid } from "./MultiplicativeMonoid";
import type { Normalizable } from "./Normalizable";
import type { PartialMultiplicativeGroup } from "./PartialMultiplicativeGroup";
import type { Scalable } from "./Scalable";
import type { Vector } from "./Vector";
import { Matrix3 } from "./Matrix3";
import { Matrix4 } from "./Matrix4";
import { Quaternion } from "./Quaternion";
import { Vector1 } from "./Vector1";
import { Vector2 } from "./Vector2";
import { Vector3 } from "./Vector3";
import { Vector4 } from "./Vector4";
import type { RangeOptions } from "./functions";
import { range, sum, sumMap } from "./functions";

// types
export type {
  VectorDimension,
  LengthOfMatrix,
  MatrixOrder,
  RangeOptions,
  TupleOf,
};

// interfaces
export type {
  AdditiveGroup,
  Clonable,
  Matrix,
  MultiplicativeMonoid,
  Normalizable,
  PartialMultiplicativeGroup,
  Scalable,
  Vector,
};

// classes
export {
  Matrix3,
  Matrix4,
  Quaternion,
  Vector1,
  Vector2,
  Vector3,
  Vector4,
};

export {
  range,
  sum,
  sumMap,
};
