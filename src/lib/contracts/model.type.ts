import type { Writable } from "svelte/store";

export type Section = {
  isOpened: Writable<boolean>;
  refHeaderHeight: Writable<number>;
  refContentHeight: Writable<number>;
  height: Writable<number>;
};

export type SectionLookup = Record<string, Section | undefined>;

export type Context = {
  sections: Writable<SectionLookup>;
};
