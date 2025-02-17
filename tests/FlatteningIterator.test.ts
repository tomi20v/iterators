import { describe, it, expect } from 'vitest';
import FlatteningIterator from "../src/FlatteningIterator";

describe('FlatteningIterator', () => {

  it('should flatten a 3x2 array of numbers correctly', () => {
    const data = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const iterator = new FlatteningIterator(data, ['y', 'x']);
    const result = Array.from(iterator);

    expect(result).toEqual([
      { y: 0, x: 0, value: 1 },
      { y: 0, x: 1, value: 2 },
      { y: 1, x: 0, value: 3 },
      { y: 1, x: 1, value: 4 },
      { y: 2, x: 0, value: 5 },
      { y: 2, x: 1, value: 6 },
    ]);
  });

  it('should handle an empty array', () => {
    const data: number[][] = [];
    const iterator = new FlatteningIterator(data, ['y', 'x']);
    const result = Array.from(iterator);

    expect(result).toEqual([]);
  });

  it('should handle a single-element array', () => {
    const data = [[42]];
    const iterator = new FlatteningIterator(data, ['y', 'x']);
    const result = Array.from(iterator);

    expect(result).toEqual([
      { x: 0, y: 0, value: 42 },
    ]);
  });

});
