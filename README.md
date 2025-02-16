# iterators
TypeScript library of 2D and recursive array iterators with reverse and rotation.

## why?
Originally a proof of concept that matrix rotation can be done by 
transforming the matrix iterators, leaving the original data intact.

These iterators can be used with "for (const x in iterator) {...}" syntax.
This is great since now these can be used in reactive template for loops 
(eg. svelte, to test).

## contents

These iterators take an array of data and (surprise!) provide an iterator to 
use in loops.

### ArrayIterator
Can handle recursively arrays of any number of dimensions.

For simple (1D) arrays using the iterator doesn't make sense as arrays can be
looped easily. However these can be reversed without reversing the original data.

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

Not very useful at the end of the day, but a fun exercise.

### ArrayIterator2D
Can handle (at least) 2D arrays. Provides rotating (by 90 degrees). Useful for 
displaying some grid or table (eg. rotating blocks in tetris)

```typescript
const arr = [[1, 2, 3], [4, 5, 6]];
const iterator = new ArrayIterator2D(arr).rotate();
for (const row of iterator) {
  for (const item of iterator) {
    console.log(item); // 4, 1, 5, 2, 6, 3
  }}

```

