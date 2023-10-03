import { derived, get, type Writable } from "svelte/store";
import type { SectionToggleDetails } from "../lib/events.type";
import type { SectionLookup } from "../lib/model.type";
import type { WritableWithValue } from "../utils/with-value";
import { calculateChanges } from "../utils/calculate-changes";
import sectionOpenEvent from "../lib/section-toggle.event";

type AccordionActionOptions = {
  parentHeight: Writable<number>;
  sections: WritableWithValue<SectionLookup>;
};

export function accordion(
  node: HTMLElement,
  { parentHeight, sections }: AccordionActionOptions,
) {
  const leftSpace = derived(
    [sections, parentHeight],
    ([$sections, $parentHeight]) => {
      return Object.keys($sections).reduce((prev, id) => {
        if (!$sections[id]) return prev;
        const { isOpened, refContentHeight, refHeaderHeight } = $sections[id]!;
        return (
          prev -
          (get(isOpened)
            ? get(refContentHeight) + get(refHeaderHeight)
            : get(refHeaderHeight))
        );
      }, $parentHeight ?? 0);
    },
  );

  const isSpaceLeft = derived(leftSpace, ($leftSpace) => $leftSpace > 0);

  const isMoreThanOneOpened = derived(sections, ($sections) => {
    return (
      Object.keys($sections).filter(
        (id) => $sections[id] && get($sections[id]!.isOpened),
      ).length >= 2
    );
  });

  const allClosed = derived(sections, ($sections) => {
    return (
      Object.keys($sections).filter(
        (id) => $sections[id] && get($sections[id]!.isOpened),
      ).length === 0
    );
  });

  function onSectionOpen({
    detail: { id },
  }: CustomEvent<SectionToggleDetails>) {
    const _sections = sections.value();
    const changes = calculateChanges({
      id,
      sections: _sections,
      leftSpace: get(leftSpace),
      isSpaceLeft: get(isSpaceLeft),
      allClosed: get(allClosed),
    });

    changes.forEach(({ id, height }) => {
      _sections[id]!.height.set(height);
    });
  }

  const unsubscribe = sectionOpenEvent.subscribe(onSectionOpen);

  return {
    destroy() {
      unsubscribe();
    },
  };
}
