// Vitest tests
import { describe, it, expect } from 'vitest';
import ArrayIterator from '../src/ArrayIterator';

const anyArray = [10, 21, 32];
const reverseArray = [32, 21, 10];

describe('ArrayIterator', () => {

  it('should have a unique id', () => {
    const uniqueIds: string[] = [];
    for (let x=0; x<100; x++) {
      const a = new ArrayIterator(anyArray);
      expect(a.uniqueId).toBeDefined();
      expect(uniqueIds).not.toContain(a.uniqueId);
      uniqueIds.push(a.uniqueId);
    }
  })

  it.only('should proxy to array', () => {
    const arr = new ArrayIterator<number>(anyArray);
    expect(arr.length).toBe(3);
    expect(arr[0]).toBe(10);
    expect(arr[1]).toBe(21);
    expect(arr[2]).toBe(32);
  })

  it.only('should proxy to reverse array', () => {
    const arr = new ArrayIterator<number>(anyArray, true);
    expect(arr[0]).toBe(32);
    expect(arr[1]).toBe(21);
    expect(arr[2]).toBe(10);
  })

  it('should iterate over elements in order', () => {
    const arr = new ArrayIterator(anyArray);
    const result = [...arr];
    expect(result).toEqual(anyArray);
  });

  it('should iterate over elements in reverse order', () => {
    const arr = new ArrayIterator(anyArray, true);
    const result = [...arr];
    expect(result).toEqual(reverseArray);
  });

  it('should allow indexed access like an array', () => {
    const arr = new ArrayIterator(anyArray);
    expect(arr[0]).toBe(10);
    expect(arr[1]).toBe(21);
    expect(arr[2]).toBe(32);
  });

  it('should handle nested arrays', () => {
    const arr = new ArrayIterator([1, [2, 3], 4]);
    const result = [...arr];

    expect(result[1]).toBeInstanceOf(ArrayIterator);

    const nestedIterator = result[1] as ArrayIterator<number>; // Explicitly cast
    expect([...nestedIterator]).toEqual([2, 3]);
  });

  it('should reverse an iterator correctly', () => {
    const arr = new ArrayIterator(anyArray);
    const reversed = arr.reverse();
    expect([...reversed]).toEqual(anyArray.reverse());
  });

});
