type NestedArray<T> = T[] | NestedArray<T>[];
type FixedIndices = (number | null)[] & { length: Exclude<number, 1>; }; // Enforce exactly one null

/**
 * Iterates an array over one axis (dimension) while keeping other indices fixed.
 * E.g. iterates a column in a 2D array.
 * Receives an array of T (at least 2 dimensions), and an incomplete set of fixed
 *  indices (coordinates), and iterates over the missing fixed index, yielding
 *  only one value (i.e. not a sub-array or sub-iterator sliced by the missing
 *  dimension)
 * NOTE: the use of this iterator is limited, since it does not support dimension
 *  swapping (for rotations). It is good enough for plain use but not for recursive.
 */
class ArrayAxisIterator<T> {
  private array: NestedArray<T>;
  private dimension: number;
  private fixedIndices: FixedIndices;
  private reverse: boolean;

  /**
   * @param array - the array to iterate over
   * @param fixedIndices - an array of fixed indices, with exactly one null value (eg. [1, null, 2])
   * @param reverse - to change the order
   */
  constructor(array: NestedArray<T>, fixedIndices: FixedIndices, reverse = false) {
    this.array = array;
    this.fixedIndices = fixedIndices;
    this.reverse = reverse;
    this.dimension = this.getArrayDimensions(array);

    if (fixedIndices.length !== this.dimension || fixedIndices.filter(i => i === null).length !== 1) {
      throw new Error("Fixed indices must match the number of dimensions and contain exactly one null value");
    }
  }

  *[Symbol.iterator](): Generator<T> {
    let a = this.array;

    // first get a sub-array by first fixed dimensions (until null, when target dimension found)
    let i = 0;
    while (i < this.fixedIndices.length && this.fixedIndices[i] !== null) {
      a = (a as NestedArray<T>[])[this.fixedIndices[i]!];
      i++;
    }
    // get indices of target dimension (todo - can we just eliminate this too)
    const indices = this.reverse ? [...Array(a.length).keys()].reverse() : [...Array(a.length).keys()];
    // loop target dimension
    for (const j of indices) {
      let subA = a[j];
      // dial down the remaining fixed indices to get the value to yield
      for (let k = i+1; k < this.fixedIndices.length; k++) {
        subA = (subA as NestedArray<T>)[this.fixedIndices[k]!];
      }
      yield subA as T;
    }

  }

  private getArrayDimensions(arr: NestedArray<T>): number {
    let dim = 0;
    while (Array.isArray(arr)) {
      dim++;
      arr = arr[0] as NestedArray<T>;
    }
    return dim;
  }

}

export default ArrayAxisIterator;

