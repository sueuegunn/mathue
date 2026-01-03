/**
 * Represents a multiplicative monoid.
 * 
 * Types implementing this interface support:
 * - Associativity: `(a * b) * c = a * (b * c)`
 * - Closure: `a * b` produces another value of type `T`
 */
interface MultiplicativeMonoid<T> {
  multiply(other: T): T;
}

export type {MultiplicativeMonoid};
