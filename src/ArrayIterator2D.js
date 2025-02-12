import { ArrayIterator } from "./ArrayIterator";
export class ArrayIterator2D {
    a;
    rotation = 0;
    constructor(a, rotation = 0) {
        this.a = a;
        this.rotation = rotation;
    }
    *[Symbol.iterator]() {
        const matrix = this.a;
        const rows = matrix.length;
        const cols = matrix[0].length;
        if (this.rotation === 0) {
            for (const row of matrix) {
                yield new ArrayIterator(row);
            }
        }
        else if (this.rotation === 90) {
            for (let y = 0; y < cols; y++) {
                yield new ArrayIterator(matrix.map(row => row[y]), true);
            }
        }
        else if (this.rotation === 180) {
            for (let y = rows - 1; y >= 0; y--) {
                yield new ArrayIterator(matrix[y], true);
            }
        }
        else if (this.rotation === 270) {
            for (let y = cols - 1; y >= 0; y--) {
                yield new ArrayIterator(matrix.map(row => row[y]));
            }
        }
    }
    rotate90() {
        const rotation = (this.rotation + 90) % 360;
        return new ArrayIterator2D(this.a, rotation);
    }
}
//# sourceMappingURL=ArrayIterator2D.js.map