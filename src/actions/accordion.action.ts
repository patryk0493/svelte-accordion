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

  const isSpaceLeft = derived(leftSpace, ($leftSpace) => $leftSpace <= 0);

  const isMoreThanOneOpened = derived(sections, ($sections) => {
    return (
      Object.keys($sections).filter(
        (id) => $sections[id] && get($sections[id]!.isOpened),
      ).length >= 2
    );
  });

  const lastOpenedSection = derived(
    [sections, isMoreThanOneOpened],
    ([$sections, $isMoreThanOneOpened]) => {
      if (!$isMoreThanOneOpened) return undefined;
      const id = Object.keys($sections).findLast((id) =>
        get($sections[id]!.isOpened),
      );
      return id ? $sections[id] : undefined;
    },
  );

  function onSectionOpen({ detail: { id } }: CustomEvent<SectionOpenDetails>) {
    const _sections = get(sections);
    const changes = calculateChanges({
      id,
      sections: _sections,
      leftSpace: get(leftSpace),
      isSpaceLeft: get(isSpaceLeft),
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

type Args = {
  id: string;
  sections: SectionLookup;
  leftSpace: number;
  isSpaceLeft: boolean;
};

function calculateChanges({
  id,
  sections,
  leftSpace,
  isSpaceLeft,
}: Args): Array<{ id: string; height: number }> {
  const { isOpened: _isOpened, refContentHeight } = sections[id]!;
  const contentHeight = get(refContentHeight);

  // ! no changes
  if (contentHeight <= 0) return [];

  // ! one change
  const isOpened = get(_isOpened);
  if (isOpened === true) {
    return [{ id, height: 0 }];
  }

  // ! two changes
  let result = leftSpace;

  const isContentHalfOfLeftSpace = contentHeight <= leftSpace / 2;
  if (isContentHalfOfLeftSpace) {
    result = contentHeight;
  }

  return [{ id, height: result }];
}
