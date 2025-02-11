# iterators
TypeScript library of 2D and recursive array iterators with reverse and rotation.

## why?
These iterators can be used with "for (const x in iterator) {...}" syntax.

This is great since now these can be used in reactive template for loops (eg. svelte, to test).

## contents

These iterators take an array of data and (surprise!) provide an iterator to use in loops.

### ArrayIterator
Can handle recursively arrays of any number of dimensions.

For simple (1D) arrays using the iterator doesn't make sense as arrays can be looped easily. However these can be reversed without reversing the original data.

For >2D arrays, it yields partial iterators recursively. Eg, when the yielded item is an array too, then another partial ArrayIterator is returned which iterates over that array.

### ArrayIterator2D
Can handle (at least) 2D arrays. Provides rotating (by 90 degrees). Useful for displaying some grid or table (eg. rotating blocks in tetris)
