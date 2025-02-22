import { uniqueId } from "lui-g";
import {IterationItem} from "./IterationItem";

export default class FlatteningIterator<T> {
  static readonly maxOneLetterDimensions = 26;
  readonly uniqueId: string = uniqueId();
  readonly dimensions: string[];
  private data: any;
  private mappers: Array<(record: IterationItem<T>) => IterationItem<T>> = [];

  constructor(data: any, dimensions?: string[]) {
    this.data = data;
    this.dimensions = dimensions || this.generateDefaultDimensions(data);
  }

  *iterate(array: any, indices: number[] = []): Generator<IterationItem<T>> {
    if (Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        yield* this.iterate(array[i], [...indices, i]);
      }
    } else {
      const result: IterationItem<T> = { value: array };
      let allDimensions = '';
      for (let i = 0; i < indices.length; i++) {
        const dimensionName = this.dimensions[i] || `dim${i}`;
        result[dimensionName] = indices[i];
        allDimensions += dimensionName + indices[i];
      }
      yield this.mapResult(result);
    }
  }

  [Symbol.iterator](): Iterator<IterationItem<T>> {
    return this.iterate(this.data);
  }

  public clone(): FlatteningIterator<T> {
    const ret = new FlatteningIterator<T>(this.data, this.dimensions);
    this.mappers.forEach(mapper => ret.use(mapper));
    return ret;
  }

  /**
   * returns a new FlatteningIterator instance with the given mapper applied
   */
  public map(fn: (record: IterationItem<T>) => IterationItem<T>): FlatteningIterator<T> {
    return this.clone().use(fn);
  }

  /**
   * Adds a mapper function to the stack of mappers.
   */
  public use(fn: (record: IterationItem<T>) => IterationItem<T>): FlatteningIterator<T> {
    const boundFn = fn.bind(this);
    this.mappers.push(boundFn);
    return this;
  }

  /**
   * clears applied mappers (resets mapper to the default null implementation)
   */
  public useDefaultMapper(): FlatteningIterator<T> {
    this.mappers = [];
    return this;
  }

  private mapResult(result: IterationItem<T>): IterationItem<T> {
    return this.mappers.reduce((acc, mapper) => mapper(acc), result);
  }

  /**
   * when <= 3 dimensions (depth of data), use [x, y, z[ as dimension names
   * when >3 but <=26 dimensions, use [a, b, c, ..., x, y, z] as dimension names
   * when >26 dimensions, use [dim0, dim1, dim2, ..., dim25, dim26] as dimension names
   */
  private generateDefaultDimensions(data: any): string[] {
    const depth = this.getArrayDepth(data);
    if (depth > FlatteningIterator.maxOneLetterDimensions) {
      return [];
    }
    const defaultNames = ['x', 'y', 'z'];
    return depth <= 3 ? defaultNames.slice(0, depth) : Array.from({ length: depth }, (_, i) => String.fromCharCode(97 + i));
  }

  private getArrayDepth(array: any, depth: number = 0): number {
    return Array.isArray(array) ? this.getArrayDepth(array[0], depth + 1) : depth;
  }

}
