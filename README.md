# iterators
TypeScript library of various array iterators with reverse and rotation.

## why?
Originally a proof of concept that matrix rotation can be done by 
transforming the matrix iterators, leaving the original data intact.


Some of these iterators are recursive, supporting 
"for (const x in iterator) {...}" syntax. This is great since now these can 
be used in reactive template for loops (eg. svelte).

## def - recursive iterator
By recursive iterator I mean one that iterates over nested arrays recursively,
to be iterated by one for loop per dimension (depth level).


## contents

These iterators take an array of data and (surprise!) provide an iterator to 
use in loops.

### ArrayAxisIterator
Iterates an array over one axis (dimension), eg. iterate a column in a 2D array.

```typescript
const anyArray3X3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const iterator = new ArrayDimensionIterator(anyArray3X3, [null, 1]);
for (const i of iterator) console.log(i); // 2m 5m 8
```

### ArrayIterator
Recursively iterates arrays (ReadonlyArray<T> types) of any number of dimensions.
Needs one loop per dimension when iterating. Compatible with frontend template
loops.

```typescript
const arr = [1, 2, 3, 4, 5];
const iterator = new ArrayIterator(arr);
for (const item of iterator) console.log(item); // 1, 2, 3, 4, 5
for (const item of iterator.reverse()) console.log(item); // 5, 4, 3, 2, 1
```

For >2D arrays, it yields partial iterators recursively. Eg, when the yielded
item is an array too, then another partial ArrayIterator is returned which
iterates over that array.

```typescript
const arr = [[1, 2, 3], [4, 5,6]];
const iterator = new ArrayIterator(arr);
for (const row of iterator) { 
  for (const item of iterator) {
    console.log(item); // 1, 2, 3, 4, 5, 6
}} 
for (const row of iterator.reverse()) { 
  for (const item of iterator) {
    console.log(item); // 4, 5, 6, 1, 2, 3
}} 
for (const row of iterator) { 
  for (const item of iterator.reverse()) {
    console.log(item); // 3, 2, 1, 6, 5, 4
}} 
```

### ArrayIterator2D
Can handle (at least) 2D data. Provides rotating (by 90 degrees). Useful for 
displaying some grid or table (eg. rotating blocks in tetris).
Current version still extracts columns with 90 and 270 degree rotations.

```typescript
const arr = [[1, 2, 3], [4, 5, 6]];
const iterator = new ArrayIterator2D(arr).rotate();
for (const row of iterator) {
  for (const item of iterator) {
    console.log(item); // 4, 1, 5, 2, 6, 3
  }}
```

### FlatteningIterator
Recursively iterates arrays (ReadonlyArray<T> types) of any number of dimensions,
but can be iterated in a single loop. Supports mappers for transformations etc.

Yields IterationItem<T> items which contain the indices ("coordinates") per 
dimension along with the value. Looping this way might result in more readable 
code, and, can reduce cyclomatic complexity.

```typescript
const arr = [[4, 5], [14, 15], [24, 25]];
const iterator = new FlatteningIterator(arr);
console.log(...iterator);

// { x: 0, y: 0, value: 4 }
// { x: 0, y: 1, value: 5 }
// { x: 1, y: 0, value: 14 }
// { x: 1, y: 1, value: 15 } 
// { x: 2, y: 0, value: 24 } 
// { x: 2, y: 1, value: 25 }
```

#### Mappers for FlatteningIterator
IteratorMappers object holds various mappers, which can be used with the 
FlatteningIterator.

```typescript
import {onlyTheValue, rotateCoords} from "./IteratorMappers";

const arr = [[4, 5], [14, 15], [24, 25]];
const iterator = new FlatteningIterator(arr);
const iterator2 = iterator.with(scale(2));
iterator.use(onlyTheValue);
console.log(...iterator); // 4, 5, 14, 15, 24, 25
console.log(...iterator2); // 8, 10, 28, 30, 48, 50
```

#### Custom mappers
Functions or arrow functions can be used for custom mappers. Functions will
be bound to the iterator object when executing.

```typescript
import {IterationItem} from "./IterationItem";
import FlatteningIterator from "./FlatteningIterator";

const arr = [[4, 5], [14, 15], [24, 25]];
const iterator = new FlatteningIterator<number>(arr).with(
  (this: FlatteningIterator<number>, each: IterationItem<number>) => {
    // expect(this).toBeInstanceOf(FlatteningIterator);
    return each;
  }
);
console.log(...iterator);
// { x: 0, y: 0, value: 4 }
// { x: 0, y: 1, value: 5 }
// { x: 1, y: 0, value: 14 }
// { x: 1, y: 1, value: 15 } 
// { x: 2, y: 0, value: 24 } 
// { x: 2, y: 1, value: 25 }
```

