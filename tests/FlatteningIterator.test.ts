import { describe, it, expect } from 'vitest';
import FlatteningIterator from "../src/FlatteningIterator";

const any4dData = [
  [
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
  ],
  [
    [[9, 10], [11, 12]],
    [[13, 14], [15, 16]]
  ]
];

const any2dData = [
  [1, 2],
  [3, 4],
  [5, 6],
];

describe('FlatteningIterator', () => {

  it('should have a unique id', () => {
    const uniqueIds: string[] = [];
    for (let x=0; x<100; x++) {
      const a = new FlatteningIterator([]);
      expect(a.uniqueId).toBeDefined();
      expect(uniqueIds).not.toContain(a.uniqueId);
      uniqueIds.push(a.uniqueId);
    }
  })


  it('should flatten a 2x3 array of numbers correctly', () => {
    const iterator = new FlatteningIterator(any2dData, ['y', 'x']);
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
    const iterator = new FlatteningIterator(data);
    const result = Array.from(iterator);

    expect(result).toEqual([
      { x: 0, y: 0, value: 42 },
    ]);
  });

  it('should handle a one-dimensional array', () => {
    const data = [10, 20, 30];
    const iterator = new FlatteningIterator(data);
    const result = Array.from(iterator);

    expect(result).toEqual([
      { x: 0, value: 10 },
      { x: 1, value: 20 },
      { x: 2, value: 30 },
    ]);
  });

  it('should flatten a 4D array correctly', () => {
    const iterator = new FlatteningIterator(any4dData, ['aDim', 'bDim', 'cDim', 'dDim']);
    const result = Array.from(iterator);

    expect(result).toEqual([
      { aDim: 0, bDim: 0, cDim: 0, dDim: 0, value: 1 },
      { aDim: 0, bDim: 0, cDim: 0, dDim: 1, value: 2 },
      { aDim: 0, bDim: 0, cDim: 1, dDim: 0, value: 3 },
      { aDim: 0, bDim: 0, cDim: 1, dDim: 1, value: 4 },
      { aDim: 0, bDim: 1, cDim: 0, dDim: 0, value: 5 },
      { aDim: 0, bDim: 1, cDim: 0, dDim: 1, value: 6 },
      { aDim: 0, bDim: 1, cDim: 1, dDim: 0, value: 7 },
      { aDim: 0, bDim: 1, cDim: 1, dDim: 1, value: 8 },
      { aDim: 1, bDim: 0, cDim: 0, dDim: 0, value: 9 },
      { aDim: 1, bDim: 0, cDim: 0, dDim: 1, value: 10 },
      { aDim: 1, bDim: 0, cDim: 1, dDim: 0, value: 11 },
      { aDim: 1, bDim: 0, cDim: 1, dDim: 1, value: 12 },
      { aDim: 1, bDim: 1, cDim: 0, dDim: 0, value: 13 },
      { aDim: 1, bDim: 1, cDim: 0, dDim: 1, value: 14 },
      { aDim: 1, bDim: 1, cDim: 1, dDim: 0, value: 15 },
      { aDim: 1, bDim: 1, cDim: 1, dDim: 1, value: 16 }
    ]);
  });

  it('should generate default dimension names x, y, z when <= 3D', () => {
    const iterator = new FlatteningIterator(any2dData);
    const result = Array.from(iterator);

    expect(result).toEqual([
      { x: 0, y: 0, value: 1 },
      { x: 0, y: 1, value: 2 },
      { x: 1, y: 0, value: 3 },
      { x: 1, y: 1, value: 4 },
      { x: 2, y: 0, value: 5 },
      { x: 2, y: 1, value: 6 },
    ]);
  });

  it('should generate default dimension names a, b, c, ... when >=4D', () => {
    const iterator = new FlatteningIterator(any4dData);
    const result = Array.from(iterator);

    expect(result[0]).toEqual({ a: 0, b: 0, c: 0, d: 0, value: 1 });
    expect(result[1]).toEqual({ a: 0, b: 0, c: 0, d: 1, value: 2 });
    expect(result[2]).toEqual({ a: 0, b: 0, c: 1, d: 0, value: 3 });
    expect(result[3]).toEqual({ a: 0, b: 0, c: 1, d: 1, value: 4 });
  });

});
