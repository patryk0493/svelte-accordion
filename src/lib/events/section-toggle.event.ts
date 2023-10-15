import type { SectionToggleDetails } from "../contracts/events.type";

export const TOGGLE_EVENT_NAME = "section:toggle";

declare global {
  interface HTMLElementEventMap {
    [TOGGLE_EVENT_NAME]: CustomEvent<SectionToggleDetails>;
  }
}

function publish(node: HTMLElement, detail: SectionToggleDetails) {
  node.dispatchEvent(
    new CustomEvent(TOGGLE_EVENT_NAME, { detail, bubbles: true }),
  );
}

function subscribe(
  node: HTMLElement,
  handler: (e: CustomEvent<SectionToggleDetails>) => void,
) {
  node.addEventListener(TOGGLE_EVENT_NAME, handler);
  return () => node.removeEventListener(TOGGLE_EVENT_NAME, handler);
}

export default {
  publish,
  subscribe,
};
