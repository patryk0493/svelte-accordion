import { type Writable } from "svelte/store";

type ParentResizeObserverActionOptions = {
  parentHeight: Writable<number>;
};

export function parentResizeObserver(
  node: HTMLElement,
  { parentHeight: { set } }: ParentResizeObserverActionOptions,
) {
  set(node.parentElement?.clientHeight ?? 0);

  const resizeObserver = new ResizeObserver(([entry]) => {
    set(entry.contentRect.height);
  });

  if (node.parentElement) {
    resizeObserver.observe(node.parentElement);
  }

  return {
    destroy() {
      resizeObserver.disconnect();
    },
  };
}
