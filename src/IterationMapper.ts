import FlatteningIterator from "./FlatteningIterator";
import {IterationItem} from "./IterationItem";

export type IterationMapper<T> = (
  this: FlatteningIterator<T>,
  item: IterationItem<T>
) => IterationItem<T>|T;

