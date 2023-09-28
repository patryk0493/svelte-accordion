import { derived, get, type Writable } from "svelte/store";
import type { SectionOpenDetails } from "@/lib/events.type";
import sectionOpenEvent from "@/lib/section-open.event";
import type { SectionLookup } from "@/lib/model.type";

type AccordionActionOptions = {
  parentHeight: Writable<number>;
  sections: Writable<SectionLookup>;
};

export function accordion(
  node: HTMLElement,
  { parentHeight, sections }: AccordionActionOptions,
) {
  parentHeight.set(node.parentElement?.clientHeight ?? 0);

  let left = derived([sections, parentHeight], ([$sections, $parentHeight]) => {
    return Object.keys($sections).reduce((prev, id) => {
      if (!$sections[id]) return prev;
      return (
        prev -
        (get($sections[id]!.isOpened)
          ? (get($sections[id]!.refContentHeight) ?? 0) +
          get($sections[id]!.refHeaderHeight) ?? 0
          : get($sections[id]!.refHeaderHeight) ?? 0)
      );
    }, $parentHeight ?? 0);
  });

  function onSectionOpen(e: CustomEvent<SectionOpenDetails>) {
    const { height, isOpened, refHeaderHeight } = get(sections)[e.detail.id]!;
    const _left = get(left);

    console.log(e.detail, _left);
    const _isOpened = get(isOpened);
    const res = _left;
    const h = _isOpened ? 0 : res;
    height.set(h);
  }

  const unsubscribe = sectionOpenEvent.subscribe(onSectionOpen);

  return {
    update() { },
    destroy() {
      unsubscribe();
    },
  };
}
