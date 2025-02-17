// src/ArrayIterator.ts

import {uniqueId} from "lui-g";

/**
 * Takes an array of T items and iterates over it in normal or reverse order
 *  (without changing the original array or creating a reversed one).
 * Supports nested (N dimensional) arrays, which can be iterated recursively.
 */
export default class ArrayIterator<T> {
  readonly length: number;
  readonly uniqueId: string = uniqueId();
  protected readonly a: Array<T>;
  protected readonly _reverse: boolean = false;

  constructor(a: Array<T>, reverse: boolean = false) {
    this.a = a;
    this.length = a.length;
    this._reverse = reverse;

    return new Proxy(this, {
      get: (target: ArrayIterator<T>, prop: string | symbol) => {
        if (typeof prop === 'string' && !isNaN(Number(prop))) {
          return target.a[Number(prop)];
        }
        return Reflect.get(target, prop);
      }
    });
  }

  *[Symbol.iterator](): Generator<T | ArrayIterator<T extends (infer U)[] ? U : never>> {
    const indices = this._reverse ? [...Array(this.length).keys()].reverse() : [...Array(this.length).keys()];

    for (const i of indices) {
      const ret = this.a[i];
      if (Array.isArray(ret)) {
        yield new ArrayIterator(ret);
      } else {
        yield ret;
      }
    }
  }

  reverse(): ArrayIterator<T> {
    return new ArrayIterator<T>(this.a, !this._reverse);
  }

  [index: number]: T; // Add this index signature
}
