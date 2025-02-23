import { describe, it, expect, test } from "vitest";
import ArrayAxisIterator from "../src/ArrayAxisIterator";

const anyArray3X3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

describe("ArrayAxisIterator", () => {

  it("iterates forward over a 1D array", () => {
    const iterator = new ArrayAxisIterator(anyArray3X3[1], [null]);
    const values = [...iterator];
    expect(values).toEqual([4, 5, 6]);
  });

  it("iterates forward over the first dimension of a 2D anyArray", () => {
    const iterator = new ArrayAxisIterator(anyArray3X3, [1, null]);
    const values = [...iterator];
    expect(values).toEqual([4, 5, 6]);
  });

  it("iterates forward over the last dimension of a 2D array", () => {
    const iterator = new ArrayAxisIterator(anyArray3X3, [null, 1]);
    const values = [...iterator];
    expect(values).toEqual([2, 5, 8]);
  });

  it("iterates in reverse over the last dimension of a 2D array", () => {
    const iterator = new ArrayAxisIterator(anyArray3X3, [1, null], true);
    const values = [...iterator];
    expect(values).toEqual([6, 5, 4]);
  });

  test.each([
    [[null, null]],
    [[2, 2]],
    [[2,]],
    [[2,3,null]],
  ])("throws an error for invalid fixed indices", (indices) => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(() => new ArrayAxisIterator(array, indices)).toThrow();
})

  it("works with a 3D array", () => {
    const array = [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ];
    const iterator = new ArrayAxisIterator(array, [0, null, 1]);
    const values = [...iterator];
    expect(values).toEqual([2, 4]);
  });

});
