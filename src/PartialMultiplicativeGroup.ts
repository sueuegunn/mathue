import type { MultiplicativeMonoid } from "./MultiplicativeMonoid";

/**
 * Represents a partial multiplicative group where multiplication is defined for all elements, \
 * but inverses exist only for certain elements (those that are invertible).
 * 
 * ### Invertibility Conditions:
 * | Type | Invertible when | Condition |
 * |------|-----------------|-----------|
 * | **Matrix** | `det(M) ≠ 0` | Non-singular (full rank) |
 * | **Quaternion** | `\|q\| ≠ 0` (non-zero norm) | Non-zero quaternion |
 */
interface PartialMultiplicativeGroup<T> extends MultiplicativeMonoid<T> {
  invert(): T | null;
  divide(other: T): T | null;
}

export type {PartialMultiplicativeGroup};
