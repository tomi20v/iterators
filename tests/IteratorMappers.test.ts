import { describe, expect, it } from "vitest";
import FlatteningIterator from "../src/FlatteningIterator";
import {move, multiply, onlyTheValue, rotateCoords, scale} from "../src/IteratorMappers";

const anyValue = 'anyValue';
const anyItem = { x: 1, y: 7, value: anyValue};
const anyIterator = new FlatteningIterator([]);
const any2DIterator = new FlatteningIterator([[]]);

describe('IteratorMappers.ts', () => {

  describe('move', () => {
    it('should move', () => {
      const result = move.bind(any2DIterator)(anyItem, {x: 11, y: 22});
      // Assert
      expect(result).toEqual({x: 12, y: 29, value: anyValue});
    })
  })

  describe('multiply', () => {
    it('multiplies', () => {
      const anyOtherItem = { x: 1, y: 7, value: 5};
      const result = multiply.bind(any2DIterator)(anyOtherItem, 42);
      expect(result).toEqual({x: 1, y: 7, value: 210});
    })
  })

  describe('onlyTheValue', () => {
    it('should return the value', () => {
      const result = onlyTheValue.bind(anyIterator)(anyItem);
      // Assert
      expect(result).toEqual('anyValue');
    });
  });

  describe('rotate', () => {
    it('rotates right', () => {
      const item = { x: 1, y: 7, value: anyValue};
      const result = rotateCoords.bind(any2DIterator)(item);
      // Assert
      expect(result).toEqual({y: -1, x: 7, value: anyValue});
    })
    it('rotates left', () => {
      const item = { x: 1, y: 7, value: anyValue};
      const result = rotateCoords.bind(any2DIterator)(item, false);
      // Assert
      expect(result).toEqual({y: 1, x: -7, value: anyValue});
    })
    it('rotates right by axes', () => {
      const result = rotateCoords.bind(any2DIterator)(anyItem, ['x', 'y']);
      // Assert
      expect(result).toEqual({y: -1, x: 7, value: anyValue});
    })
    it('rotates left by axes', () => {
      const result = rotateCoords.bind(any2DIterator)(anyItem, ['y', 'x']);
      // Assert
      expect(result).toEqual({y: 1, x: -7, value: anyValue});
    })
  })

  describe('scale', () => {
    it('scales by a simple number', () => {
      const result = scale.bind(any2DIterator)(anyItem, 3);
      // Assert
      expect(result).toEqual({x: 3, y: 21, value: anyValue});
    });
    it('scales by an object', () => {
      const result = scale.bind(any2DIterator)(anyItem, {x: 3, y: 4});
      // Assert
      expect(result).toEqual({x: 3, y: 28, value: anyValue});
    });
  });

});
