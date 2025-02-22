import {IterationItem} from "./IterationItem";
import FlatteningIterator from "./FlatteningIterator";

export const move = function <T>(
  this: FlatteningIterator<T>,
  item: IterationItem<T>,
  move: {
    [key: string]: number;
  }
): IterationItem<T> {
  const ret = { ...item };
  for (const key in move) {
    ret[key] += move[key];
  }
  return ret;
}

export const onlyTheValue = function <T>(this: FlatteningIterator<T>, item: IterationItem<T>): T {
  return item.value;
}

export const rotateCoords = function <T>(
  this: FlatteningIterator<T>,
  item: IterationItem<T>,
  axes: boolean|string[] = true
): IterationItem<T> {
  let firstAxe, secondAxe;
  if (axes === true) {
    firstAxe = this.dimensions[0];
    secondAxe = this.dimensions[1];
  }
  else if (axes === false) {
    firstAxe = this.dimensions[1];
    secondAxe = this.dimensions[0];
  }
  else {
    firstAxe = axes[0];
    secondAxe = axes[1];
  }
  const ret = { ...item };
  ret[firstAxe] = item[secondAxe];
  ret[secondAxe] = -item[firstAxe];
  return ret;
}
