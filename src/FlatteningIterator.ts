export default class FlatteningIterator<T> {
  private data: any;
  private dimensionsInReverse: string[];

  constructor(data: any, dimensionsInReverse: string[]) {
    this.data = data;
    this.dimensionsInReverse = dimensionsInReverse;
  }

  *iterate(array: any, indices: number[] = []): Generator<Record<string, any>> {
    if (Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        yield* this.iterate(array[i], [...indices, i]);
      }
    } else {
      const result: Record<string, any> = { value: array };
      for (let i = 0; i < indices.length; i++) {
        const dimensionName = this.dimensionsInReverse[i] || `dim${i}`;
        result[dimensionName] = indices[i];
      }
      yield result;
    }
  }

  [Symbol.iterator](): Iterator<Record<string, any>> {
    return this.iterate(this.data);
  }
}
