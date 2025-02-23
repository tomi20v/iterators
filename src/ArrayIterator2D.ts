// src/ArrayIterator2D.ts
import { uniqueId } from "lui-g";
import ArrayIterator from "./ArrayIterator";
import ArrayDimensionIterator from "./ArrayDimensionIterator";

/**
 * Takes a 2D array and provides recursive iteration over it (just like
 *  iterating over the original array).
 * It supports rotation, which returns another ArrayIterator2D instance, which
 *  keeps the original data array but provides different iterators.
 * Useful when displaying bitmap like data in reactive frontend template loops
 *  with the need of rotating without rotating the data itself.
 */
export default class ArrayIterator2D<T> {
  readonly a: T[][];
  readonly rotation: number = 0;
  readonly uniqueId: string = uniqueId();

  constructor(a: T[][], rotation = 0) {
    this.a = a;
    this.rotation = rotation;
  }

  *[Symbol.iterator](): Generator<ArrayIterator<T>|ArrayDimensionIterator<T>> {
    const matrix = this.a as unknown as T[][];
    const rows = matrix.length;
    const cols = matrix[0].length;

    if (this.rotation === 0) {
      for (const row of matrix) {
        yield new ArrayIterator<T>(row);
      }
    } else if (this.rotation === 90) {
      for (let y = 0; y < cols; y++) {
        yield new ArrayDimensionIterator<T>(this.a, [null, y], true);
      }
    } else if (this.rotation === 180) {
      for (let y = rows - 1; y >= 0; y--) {
        yield new ArrayIterator<T>(matrix[y], true);
      }
    } else if (this.rotation === 270) {
      for (let y = cols - 1; y >= 0; y--) {
        yield new ArrayDimensionIterator<T>(this.a, [null, y]);
      }
    }
  }

  public rotate(degrees: number = 90): ArrayIterator2D<T> {
    if ((degrees % 90) !== 0) {
      throw new Error('only multiples of 90');
    }
    const rotation = (this.rotation + degrees + 360) % 360;
    return new ArrayIterator2D<T>(this.a, rotation);
  }
}
