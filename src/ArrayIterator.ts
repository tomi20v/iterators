// src/ArrayIterator.ts

import {uniqueId} from "lui-g";

/**
 * Takes an array of T items and iterates over it in normal or reverse order
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
        // return own public properties and methods
        if (['uniqueId','reverse'].includes(prop as string)) {
          // @ts-expect-error
          return this[prop];
        }
        if (typeof prop === "string") {
          const index = Number(prop);
          if (!isNaN(index)) {
            return target.iterated[index];
          }
          if (prop in target.iterated) {
            let targetProp = (target.iterated as any)[prop];
            if (typeof targetProp === "function") {
              targetProp = targetProp.bind(target.iterated);
            }
            return targetProp;
          }
        }
        return Reflect.get(target, prop);
      }
    });

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
