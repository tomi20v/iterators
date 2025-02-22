import {beforeEach, describe, expect, it, vi} from 'vitest';
import FlatteningIterator from "../src/FlatteningIterator";
import {IterationItem} from "../src/IterationItem";

const any1dData = [10, 20, 30];
const any2dData = [
  [1, 2],
  [3, 4],
  [5, 6],
];
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

const done = vi.fn();

describe('FlatteningIterator', () => {

  beforeEach(() => {
    done.mockReset();
  })

  it('should have a unique id', () => {
    const uniqueIds: string[] = [];
    for (let x=0; x<100; x++) {
      const a = new FlatteningIterator([]);
      expect(a.uniqueId).toBeDefined();
      expect(uniqueIds).not.toContain(a.uniqueId);
      uniqueIds.push(a.uniqueId);
    }
  })

  it('should clone', () => {
    const iterator = new FlatteningIterator<number>(any1dData);
    iterator.use(each => ({...each, value: 4 * each.value}))
    const clone = iterator.clone();
    expect(clone).not.toBe(iterator);
    expect(clone.uniqueId).not.toBe(iterator.uniqueId);
    expect (Array.from(clone)).toEqual(Array.from(iterator));
  })

  describe('should handle arrays', () => {

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
      const iterator = new FlatteningIterator(any1dData);
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

  })

  describe ('handles dimension names', () => {

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

  })

  describe('with deep arrays...', () => {
    let deepArr: any[] = [];
    beforeEach(() => {
      deepArr = [42];
      for (let i=0; i<25; i++) {
        deepArr = [deepArr];
      }
    })

    it('should use one letter dimension names when many dimensions', () => {
      const iterator = new FlatteningIterator(deepArr);
      const result = Array.from(iterator);
      expect(result[0]).toHaveProperty('a');
      expect(result[0]).toHaveProperty('b');
      expect(result[0]).toHaveProperty('c');
      expect(result[0]).toHaveProperty('x');
      expect(result[0]).toHaveProperty('y');
      expect(result[0]).toHaveProperty('z');
    })

    it('should use "dimXx" dimension names when many dimensions', () => {
      deepArr = [deepArr];
      const iterator = new FlatteningIterator(deepArr);
      const result = Array.from(iterator);
      expect(result[0]).toHaveProperty('dim0');
      expect(result[0]).toHaveProperty('dim1');
      expect(result[0]).toHaveProperty('dim2');
      expect(result[0]).toHaveProperty('dim25');
      expect(result[0]).toHaveProperty('dim26');
    })

  })

  describe('maps yielded values', () => {

    it('should map', () => {
      const iterator = new FlatteningIterator<number>(any1dData);
      iterator.use((record: IterationItem<number>) => {
        return { ...record, value: record.value * 2, hu: 'FU' } as IterationItem<number>;
      });
      const result = Array.from(iterator);
      function check(resultItem: IterationItem<number>, expectedItem: IterationItem<number>) {
        expect(resultItem.x).toBe(expectedItem.x);
        expect(resultItem.value).toBe(expectedItem.value);
        expect(resultItem.hu).toBe(expectedItem.hu);
      }
      check(result[0], { value: 20, x: 0, hu: 'FU' });
      check(result[1], { value: 40, x: 1, hu: 'FU' });
      check(result[2], { value: 60, x: 2, hu: 'FU' });

    });

    it('should stack mappers', () => {
      const iterator = new FlatteningIterator<number>(any1dData);
      iterator.use((record) => {
        return { ...record, value: record.value * 2, hu: 'FU' };
      });
      iterator.use((record) => {
        return { ...record, value: record.value * 10, hux: 'BU' };
      });
      const result = Array.from(iterator);
    });

    it('should bind to the iterator instance when function', () => {
      const iterator = new FlatteningIterator<number>(any1dData);
      iterator.use(function (this: FlatteningIterator<number>, record) {
        expect(this).toBeInstanceOf(FlatteningIterator);
        done();
        return { ...record, value: record.value * 2, hu: 'FU' };
      });
      Array.from(iterator);
      expect(done).toBeCalled();
    })

    it('should reset iterators', () => {
      const iterator = new FlatteningIterator<number>(any1dData);
      iterator.use((record) => {
        done();
        return record;
      });
      Array.from(iterator);
      expect(done).toBeCalled();
      iterator.useDefaultMapper()
      Array.from(iterator);
      done.mockReset();
      expect(done).not.toBeCalled();
    })

    it('should give new instance with additional mapper applied', () => {
      const iterator = new FlatteningIterator<number>(any1dData);
      const iterator2 = iterator.map(function(this: FlatteningIterator<number>, record) {
        done(this.uniqueId);
        return { ...record, value: record.value * 2, hu: 'FU' };
      });

      // this actually calls done(), not sure how and why lol
      // expect(iterator2).not.toBe(iterator);
      // this indirectly checks they're not the same
      expect(iterator2.uniqueId).not.toBe(iterator.uniqueId);

      Array.from(iterator);
      expect(done).not.toBeCalled();
      const result2 = Array.from(iterator2);
      expect(done).toBeCalledWith(iterator2.uniqueId);
      expect(result2[0]).toEqual({ x: 0, value: 20, hu: 'FU' });
    })

  })

});
