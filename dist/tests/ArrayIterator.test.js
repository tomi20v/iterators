"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Vitest tests
const vitest_1 = require("vitest");
const ArrayIterator_1 = require("../src/ArrayIterator");
(0, vitest_1.describe)('ArrayIterator', () => {
    (0, vitest_1.it)('should iterate over elements in order', () => {
        const arr = new ArrayIterator_1.default([1, 2, 3]);
        const result = [...arr];
        (0, vitest_1.expect)(result).toEqual([1, 2, 3]);
    });
    (0, vitest_1.it)('should iterate over elements in reverse order', () => {
        const arr = new ArrayIterator_1.default([1, 2, 3], true);
        const result = [...arr];
        (0, vitest_1.expect)(result).toEqual([3, 2, 1]);
    });
    (0, vitest_1.it)('should allow indexed access like an array', () => {
        const arr = new ArrayIterator_1.default([10, 20, 30]);
        (0, vitest_1.expect)(arr[0]).toBe(10);
        (0, vitest_1.expect)(arr[1]).toBe(20);
        (0, vitest_1.expect)(arr[2]).toBe(30);
    });
    (0, vitest_1.it)('should handle nested arrays', () => {
        const arr = new ArrayIterator_1.default([1, [2, 3], 4]);
        const result = [...arr];
        (0, vitest_1.expect)(result[1]).toBeInstanceOf(ArrayIterator_1.default);
        const nestedIterator = result[1]; // Explicitly cast
        (0, vitest_1.expect)([...nestedIterator]).toEqual([2, 3]);
    });
    (0, vitest_1.it)('should reverse an iterator correctly', () => {
        const arr = new ArrayIterator_1.default([1, 2, 3]);
        const reversed = arr.reverse();
        (0, vitest_1.expect)([...reversed]).toEqual([3, 2, 1]);
    });
});
//# sourceMappingURL=ArrayIterator.test.js.map