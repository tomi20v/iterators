export declare class ArrayIterator<T> {
    readonly length: number;
    protected readonly a: Array<T>;
    protected readonly _reverse: boolean;
    constructor(a: Array<T>, reverse?: boolean);
    [Symbol.iterator](): Generator<T | ArrayIterator<T extends (infer U)[] ? U : never>>;
    reverse(): ArrayIterator<T>;
    [index: number]: T;
}
