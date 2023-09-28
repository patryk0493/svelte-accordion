import type { Writable } from "svelte/store";

export type SectionLookup = Record<
  string,
  | {
      isOpened: Writable<boolean>;
      refHeaderHeight: Writable<number>;
      refContentHeight: Writable<number | undefined>;
      height: Writable<number>;
    }
  | undefined
>;

export type Context = {
  sections: Writable<SectionLookup>;
};
