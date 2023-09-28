import type { SectionOpenDetails } from "@/lib/events.type";

declare global {
  interface WindowEventMap {
    "section:open": CustomEvent<SectionOpenDetails>;
  }
  interface DocumentEventMap {
    "section:open": CustomEvent<SectionOpenDetails>;
  }
}

function publish(detail: SectionOpenDetails) {
  document.dispatchEvent(new CustomEvent("section:open", { detail }));
}

function subscribe(handler: (e: CustomEvent<SectionOpenDetails>) => void) {
  document.addEventListener("section:open", handler);
  return () => document.removeEventListener("section:open", handler);
}

export default {
  publish,
  subscribe,
};
