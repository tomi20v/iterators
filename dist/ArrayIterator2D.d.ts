import { ArrayIterator } from "./ArrayIterator";
export declare class ArrayIterator2D<T> {
    readonly a: T[][];
    readonly rotation: number;
    constructor(a: T[][], rotation?: number);
    [Symbol.iterator](): Generator<ArrayIterator<T>>;
    rotate90(): ArrayIterator2D<T>;
}
