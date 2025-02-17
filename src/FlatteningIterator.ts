import { uniqueId } from "lui-g";

export default class FlatteningIterator<T> {
  readonly uniqueId: string = uniqueId();
  private data: any;
  private dimensions: string[];

  constructor(data: any, dimensions?: string[]) {
    this.data = data;
    this.dimensions = dimensions || this.generateDefaultDimensions(data);
  }

  *iterate(array: any, indices: number[] = []): Generator<Record<string, any>> {
    if (Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        yield* this.iterate(array[i], [...indices, i]);
      }
    } else {
      const result: Record<string, any> = { value: array };
      for (let i = 0; i < indices.length; i++) {
        const dimensionName = this.dimensions[i] || `dim${i}`;
        result[dimensionName] = indices[i];
      }
      yield result;
    }
  }

  [Symbol.iterator](): Iterator<Record<string, any>> {
    return this.iterate(this.data);
  }

  private generateDefaultDimensions(data: any): string[] {
    const depth = this.getArrayDepth(data);
    const defaultNames = ['x', 'y', 'z'];
    return depth <= 3 ? defaultNames.slice(0, depth) : Array.from({ length: depth }, (_, i) => String.fromCharCode(97 + i));
  }

  private getArrayDepth(array: any, depth: number = 0): number {
    return Array.isArray(array) ? this.getArrayDepth(array[0], depth + 1) : depth;
  }

}
