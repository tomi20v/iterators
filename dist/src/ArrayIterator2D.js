"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayIterator_1 = require("./ArrayIterator");
class ArrayIterator2D {
    constructor(a, rotation = 0) {
        this.rotation = 0;
        this.a = a;
        this.rotation = rotation;
    }
    *[Symbol.iterator]() {
        const matrix = this.a;
        const rows = matrix.length;
        const cols = matrix[0].length;
        if (this.rotation === 0) {
            for (const row of matrix) {
                yield new ArrayIterator_1.default(row);
            }
        }
        else if (this.rotation === 90) {
            for (let y = 0; y < cols; y++) {
                yield new ArrayIterator_1.default(matrix.map(row => row[y]), true);
            }
        }
        else if (this.rotation === 180) {
            for (let y = rows - 1; y >= 0; y--) {
                yield new ArrayIterator_1.default(matrix[y], true);
            }
        }
        else if (this.rotation === 270) {
            for (let y = cols - 1; y >= 0; y--) {
                yield new ArrayIterator_1.default(matrix.map(row => row[y]));
            }
        }
    }
    rotate90() {
        const rotation = (this.rotation + 90) % 360;
        return new ArrayIterator2D(this.a, rotation);
    }
}
exports.default = ArrayIterator2D;
//# sourceMappingURL=ArrayIterator2D.js.map