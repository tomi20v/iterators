// src/ArrayIterator.ts

import {uniqueId} from "lui-g";

/**
 * Takes a nested array of T items and iterates over it in normal or reverse order
 *  (without changing the original array or creating a reversed one).
 * Supports nested (N dimensional) arrays, which can be iterated recursively.
 */
export default class ArrayIterator<T> {
// this signature would be better but then the iterator methods return value won't work out
// export default class ArrayIterator<T> implements ReadonlyArray<T> {

  readonly uniqueId: string = uniqueId();
  protected readonly iterated: ReadonlyArray<T>;
  protected readonly isReverse: boolean = false;

  [index: number]: T; // Add this index signature

  constructor(iterated: ReadonlyArray<T>, reverse: boolean = false) {
    this.iterated = iterated;
    this.isReverse = reverse;

    return new Proxy(this, {
      get: (target: ArrayIterator<T>, prop: string | symbol) => {
        // array access by numeric index
        if (typeof prop === "string") {
          const index = Number(prop);
          if (!isNaN(index)) {
            return target.iterated[target.isReverse ? target.iterated.length - 1 - index : index];
          }
        }
        return Reflect.get(target, prop);
      }
    });

  }

  get length() {
    return this.iterated?.length;
  }

  *[Symbol.iterator](): Generator<T | ArrayIterator<T extends (infer U)[] ? U : never>> {
    const keys = [...Array(this.iterated.length).keys()];
    const indices = this.isReverse ? keys.reverse() : keys;
    for (const i of indices) {
      const ret = this.iterated[i];
      if (Array.isArray(ret)) {
        yield new ArrayIterator(ret);
      } else {
        yield ret;
      }
    }
  }

  reverse(): ArrayIterator<T> {
    return new ArrayIterator<T>(this.iterated, !this.isReverse);
  }

}
