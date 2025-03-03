import {IterationItem} from "./IterationItem";
import FlatteningIterator from "./FlatteningIterator";
import { IterationMapper } from "./IterationMapper";

export const move = function <T>(
  move: {
    [key: string]: number;
  }
): IterationMapper<T> {
  return function<T>(this: FlatteningIterator<T>, item: IterationItem<T>): IterationItem<T> {
    const ret = { ...item };
    for (const key in move) {
      ret[key] += move[key];
    }
    return ret;
  }
}

export const multiply = function <T>(
  mul: number
): IterationMapper<T> {
  return function<T>(this: FlatteningIterator<T>, item: IterationItem<T>): IterationItem<T> {
    const ret: IterationItem<T> = { ...item };
    (ret.value as number) *= mul;
    return ret;
  }
}

export const onlyTheValue = function <T>(): (this: FlatteningIterator<T>, item: IterationItem<T>) => T {
  return function(
    this: FlatteningIterator<T>,
    item: IterationItem<T>
  ): T {
    return item.value;
  }
}

export const rotateCoords = function <T>(
  degrees: 0 | 90 | 180 | 270 = 90,
  axes: boolean | string[] = true
): IterationMapper<T> {
  return function(
    this: FlatteningIterator<T>,
    item: IterationItem<T>
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
    switch(degrees) {
      case 90:
        ret[firstAxe] = item[secondAxe];
        ret[secondAxe] = -item[firstAxe];
        break;
      case 180:
        ret[firstAxe] = -item[firstAxe];
        ret[secondAxe] = -item[secondAxe];
        break;
      case 270:
        ret[firstAxe] = -item[secondAxe];
        ret[secondAxe] = item[firstAxe];
        break;
    }
    return ret;
  }

}

export const scale = function <T>(
  scale: number | {
    [key: string]: number;
  }
): IterationMapper<T> {
  return function(
    this: FlatteningIterator<T>,
    item: IterationItem<T>
  ): IterationItem<T> {

    const ret = { ...item };
    if (typeof scale === "number") {
      this.dimensions.forEach(key => {
        ret[key] *= scale;
      });
      return ret;
    }
    for (const key in scale) {
      ret[key] *= scale[key];
    }
    return ret;
  }
}
