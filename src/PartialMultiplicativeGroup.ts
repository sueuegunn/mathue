import type { MultiplicativeMonoid } from "./MultiplicativeMonoid";

interface PartialMultiplicativeGroup<T> extends MultiplicativeMonoid<T> {
  invert(): T | null;
  divide(other: T): T | null;
}

export type {PartialMultiplicativeGroup};
