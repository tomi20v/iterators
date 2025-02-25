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
      const result = move({x: 11, y: 22}).bind(any2DIterator)(anyItem);
      // Assert
      expect(result).toEqual({x: 12, y: 29, value: anyValue});
    })
  })

  describe('multiply', () => {
    it('multiplies', () => {
      const anyOtherItem = { x: 1, y: 7, value: 5};
      const result = multiply(42).bind(any2DIterator)(anyOtherItem);
      expect(result).toEqual({x: 1, y: 7, value: 210});
    })
  })

  describe('onlyTheValue', () => {
    it('should return the value', () => {
      const result = onlyTheValue().bind(anyIterator)(anyItem);
      // Assert
      expect(result).toEqual('anyValue');
    });
  });

  describe('rotate', () => {
    it('rotates right', () => {
      const item = { x: 1, y: 7, value: anyValue};
      const result = rotateCoords().bind(any2DIterator)(item);
      // Assert
      expect(result).toEqual({x: 7, y: -1, value: anyValue});
    })
    it('rotates right 180', () => {
      const item = { x: 1, y: 7, value: anyValue};
      const result = rotateCoords(180, true).bind(any2DIterator)(item);
      // Assert
      expect(result).toEqual({x: -1, y: -7, value: anyValue});
    })
    it('rotates right 270', () => {
      const item = { x: 1, y: 7, value: anyValue};
      const result = rotateCoords(270, true).bind(any2DIterator)(item);
      // Assert
      expect(result).toEqual({x: -7, y: 1, value: anyValue});
    })
    it('rotates left', () => {
      const item = { x: 1, y: 7, value: anyValue};
      const result = rotateCoords(90, false).bind(any2DIterator)(item);
      // Assert
      expect(result).toEqual({x: -7, y: 1, value: anyValue});
    })
    it('rotates right by axes', () => {
      const result = rotateCoords(90, ['x', 'y']).bind(any2DIterator)(anyItem);
      // Assert
      expect(result).toEqual({y: -1, x: 7, value: anyValue});
    })
    it('rotates left by axes', () => {
      const result = rotateCoords(90, ['y', 'x']).bind(any2DIterator)(anyItem);
      // Assert
      expect(result).toEqual({y: 1, x: -7, value: anyValue});
    })
  })

  describe('scale', () => {
    it('scales by a simple number', () => {
      const result = scale(3).bind(any2DIterator)(anyItem);
      // Assert
      expect(result).toEqual({x: 3, y: 21, value: anyValue});
    });
    it('scales by an object', () => {
      const result = scale({x: 3, y: 4}).bind(any2DIterator)(anyItem);
      // Assert
      expect(result).toEqual({x: 3, y: 28, value: anyValue});
    });
  });

});
