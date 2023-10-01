import { get } from "svelte/store";
import type { SectionLookup } from "../lib/model.type";

type CalculateChangesOptions = {
  id: string;
  sections: SectionLookup;
  leftSpace: number;
  isSpaceLeft: boolean;
  allClosed: boolean;
};

export function calculateChanges({
  id,
  sections,
  leftSpace,
  isSpaceLeft,
  allClosed,
}: CalculateChangesOptions): Array<{ id: string; height: number }> {
  const { isOpened: _isOpened, refContentHeight } = sections[id]!;
  const contentHeight = get(refContentHeight);

  // ? 0️⃣  no changes
  if (contentHeight <= 0) return [];

  if (allClosed) {
    return [{ id, height: leftSpace }];
  }

  // ? 1️⃣ one change
  const isOpened = get(_isOpened);
  if (isOpened === true) {
    return [{ id, height: 0 }];
  }

  let result = leftSpace;

  // ? 📖 was closed
  const isContentHalfOfLeftSpace = contentHeight <= leftSpace / 2;
  if (isContentHalfOfLeftSpace) {
    result = contentHeight;
  }

  if (!isSpaceLeft) {
    let biggestSectionId = Object.keys(sections)[0];

    Object.keys(sections).forEach((key) => {
      if (
        get(sections[key]!.refContentHeight) >=
        get(sections[biggestSectionId]!.refContentHeight)
      ) {
        biggestSectionId = key;
      }
    });

    const section = sections[biggestSectionId]!;
    result = Math.min(contentHeight, 100);

    return [
      { id, height: result },
      { id: biggestSectionId, height: get(section.height) - result },
    ];
  }

  return [{ id, height: result }];
}
