"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayIterator = void 0;
// src/ArrayIterator.ts
class ArrayIterator {
    constructor(a, reverse = false) {
        this._reverse = false;
        this.a = a;
        this.length = a.length;
        this._reverse = reverse;
        return new Proxy(this, {
            get: (target, prop) => {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    return target.a[Number(prop)];
                }
                return Reflect.get(target, prop);
            }
        });
    }
    *[Symbol.iterator]() {
        const indices = this._reverse ? [...Array(this.length).keys()].reverse() : [...Array(this.length).keys()];
        for (const i of indices) {
            const ret = this.a[i];
            if (Array.isArray(ret)) {
                yield new ArrayIterator(ret);
            }
            else {
                yield ret;
            }
        }
    }
    reverse() {
        return new ArrayIterator(this.a, !this._reverse);
    }
}
exports.ArrayIterator = ArrayIterator;
//# sourceMappingURL=ArrayIterator.js.map