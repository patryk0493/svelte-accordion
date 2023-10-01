import type { SectionToggleDetails } from "@/lib/events.type";

export const TOGGLE_EVENT_NAME = 'section:toggle';

declare global {
  interface WindowEventMap {
    [TOGGLE_EVENT_NAME]: CustomEvent<SectionToggleDetails>;
  }
  interface DocumentEventMap {
    [TOGGLE_EVENT_NAME]: CustomEvent<SectionToggleDetails>;
  }
}

function publish(detail: SectionToggleDetails) {
  document.dispatchEvent(new CustomEvent(TOGGLE_EVENT_NAME, { detail }));
}

function subscribe(handler: (e: CustomEvent<SectionToggleDetails>) => void) {
  document.addEventListener(TOGGLE_EVENT_NAME, handler);
  return () => document.removeEventListener(TOGGLE_EVENT_NAME, handler);
}

export default {
  publish,
  subscribe,
};
