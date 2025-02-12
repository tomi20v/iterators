"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const src_1 = require("../src");
(0, vitest_1.describe)('ArrayIterator2D', () => {
    const sampleMatrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12]
    ];
    (0, vitest_1.it)('should iterate row by row when rotation is 0', () => {
        const iterator = new src_1.ArrayIterator2D(sampleMatrix);
        const result = Array.from(iterator).map(row => Array.from(row));
        (0, vitest_1.expect)(result).toEqual(sampleMatrix);
    });
    (0, vitest_1.it)('should iterate column by column (rotated 90 degrees)', () => {
        const iterator = new src_1.ArrayIterator2D(sampleMatrix).rotate90();
        const result = Array.from(iterator).map(row => Array.from(row));
        (0, vitest_1.expect)(result).toEqual([
            [10, 7, 4, 1],
            [11, 8, 5, 2],
            [12, 9, 6, 3]
        ]);
    });
    (0, vitest_1.it)('should iterate in reverse order (rotated 180 degrees)', () => {
        const iterator = new src_1.ArrayIterator2D(sampleMatrix).rotate90().rotate90();
        const result = Array.from(iterator).map(row => Array.from(row));
        (0, vitest_1.expect)(result).toEqual([
            [12, 11, 10],
            [9, 8, 7],
            [6, 5, 4],
            [3, 2, 1]
        ]);
    });
    (0, vitest_1.it)('should iterate column by column in reverse (rotated 270 degrees)', () => {
        const iterator = new src_1.ArrayIterator2D(sampleMatrix).rotate90().rotate90().rotate90();
        const result = Array.from(iterator).map(row => Array.from(row));
        (0, vitest_1.expect)(result).toEqual([
            [3, 6, 9, 12],
            [2, 5, 8, 11],
            [1, 4, 7, 10]
        ]);
    });
    (0, vitest_1.it)('should return to original order after four rotations', () => {
        const iterator = new src_1.ArrayIterator2D(sampleMatrix)
            .rotate90()
            .rotate90()
            .rotate90()
            .rotate90();
        const result = Array.from(iterator).map(row => Array.from(row));
        (0, vitest_1.expect)(result).toEqual(sampleMatrix);
    });
});
//# sourceMappingURL=ArrayIterator2D.test.js.map