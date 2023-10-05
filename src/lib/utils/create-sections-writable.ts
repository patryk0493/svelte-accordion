import { writable } from "svelte/store";
import type { SectionLookup } from "../contracts/model.type";
import { withValue } from "../utils/with-value";

export const createSectionsWritable = () =>
  withValue(writable<SectionLookup>({}));
