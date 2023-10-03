import { get, type Readable, type Writable } from "svelte/store";

export type WritableWithValue<
  K = any,
  T extends Writable<K> = Writable<K>,
> = T & { value: () => K };

export function withValue<T>(writable: Writable<T>): WritableWithValue<T> {
  return { ...writable, value: () => get(writable) };
}
