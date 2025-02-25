import { describe, it, expect } from 'vitest';
import {ArrayIterator2D} from "../src";

describe('ArrayIterator2D', () => {
  const sampleMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
  ];

  it('should have a unique id', () => {
    const uniqueIds: string[] = [];
    for (let x=0; x<100; x++) {
      const a = new ArrayIterator2D(sampleMatrix);
      expect(a.uniqueId).toBeDefined();
      expect(uniqueIds).not.toContain(a.uniqueId);
      uniqueIds.push(a.uniqueId);
    }
  })

  it('should iterate row by row when rotation is 0', () => {
    const iterator = new ArrayIterator2D(sampleMatrix);
    const result = Array.from(iterator).map(row => Array.from(row));
    expect(result).toEqual(sampleMatrix);
  });

  it('should iterate column by column (rotated 90 degrees)', () => {
    const iterator = new ArrayIterator2D(sampleMatrix).rotate();
    const result = Array.from(iterator).map(row => Array.from(row));
    expect(result).toEqual([
      [10, 7, 4, 1],
      [11, 8, 5, 2],
      [12, 9, 6, 3]
    ]);
  });

  it('should iterate in reverse order (rotated 180 degrees)', () => {
    const iterator = new ArrayIterator2D(sampleMatrix).rotate().rotate();
    const result = Array.from(iterator).map(row => Array.from(row));
    expect(result).toEqual([
      [12, 11, 10],
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1]
    ]);
  });

  it('should iterate column by column in reverse (rotated 270 degrees)', () => {
    const iterator = new ArrayIterator2D(sampleMatrix).rotate().rotate().rotate();
    const result = Array.from(iterator).map(row => Array.from(row));
    expect(result).toEqual([
      [3, 6, 9, 12],
      [2, 5, 8, 11],
      [1, 4, 7, 10]
    ]);
  });

  it('should return to original order after four rotations', () => {
    const iterator = new ArrayIterator2D(sampleMatrix)
      .rotate()
      .rotate()
      .rotate()
      .rotate();
    const result = Array.from(iterator).map(row => Array.from(row));
    expect(result).toEqual(sampleMatrix);
  });

  it('should iterate column by column (rotated -90 degrees)', () => {
    const iterator = new ArrayIterator2D(sampleMatrix).rotate(-90);
    const result = Array.from(iterator).map(row => Array.from(row));
    expect(result).toEqual([
      [3, 6, 9, 12],
      [2, 5, 8, 11],
      [1, 4, 7, 10]
    ]);
  });

  it('should iterate in reverse order (rotated -180 degrees)', () => {
    const iterator = new ArrayIterator2D(sampleMatrix).rotate(-90).rotate(-90);
    const result = Array.from(iterator).map(row => Array.from(row));
    expect(result).toEqual([
      [12, 11, 10],
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1]
    ]);
  });

  it('should iterate column by column in reverse (rotated -270 degrees)', () => {
    const iterator = new ArrayIterator2D(sampleMatrix).rotate(-90).rotate(-90).rotate(-90);
    const result = Array.from(iterator).map(row => Array.from(row));
    expect(result).toEqual([
      [10, 7, 4, 1],
      [11, 8, 5, 2],
      [12, 9, 6, 3]
    ]);
  });

  it('should return to original order after four reverse rotations', () => {
    const iterator = new ArrayIterator2D(sampleMatrix)
      .rotate(-90)
      .rotate(-90)
      .rotate(-90)
      .rotate(-90);
    const result = Array.from(iterator).map(row => Array.from(row));
    expect(result).toEqual(sampleMatrix);
  });

  it.each([
    42,
    91,
    -11,
  ])('should throw when not multiple of 90', (degrees: number) => {
    const iterator = new ArrayIterator2D(sampleMatrix);
    expect(() => iterator.rotate(degrees)).toThrow();
  })

});
