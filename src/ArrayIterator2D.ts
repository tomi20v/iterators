import {ArrayIterator} from "./ArrayIterator";

export class ArrayIterator2D<T> {
  readonly a: T[][];
  readonly rotation: number = 0;

  constructor(a: T[][], rotation = 0) {
    this.a = a;
    this.rotation = rotation;
  }

  *[Symbol.iterator](): Generator<ArrayIterator<T>> {
    const matrix = this.a as unknown as T[][];
    const rows = matrix.length;
    const cols = matrix[0].length;

    if (this.rotation === 0) {
      for (const row of matrix) {
        yield new ArrayIterator<T>(row);
      }
    } else if (this.rotation === 90) {
      for (let y = 0; y < cols; y++) {
        yield new ArrayIterator<T>(matrix.map(row => row[y]), true);
      }
    } else if (this.rotation === 180) {
      for (let y = rows - 1; y >= 0; y--) {
        yield new ArrayIterator<T>(matrix[y], true);
      }
    } else if (this.rotation === 270) {
      for (let y = cols - 1; y >= 0; y--) {
        yield new ArrayIterator<T>(matrix.map(row => row[y]));
      }
    }
  }

  public rotate90(): ArrayIterator2D<T> {
    const rotation = (this.rotation + 90) % 360;
    return new ArrayIterator2D<T>(this.a, rotation);
  }
}
