import * as matchers from "vitest-dom/matchers";
import "vitest-dom/extend-expect";
import { expect, vi } from "vitest";

expect.extend(matchers);

vi.stubGlobal(
  "ResizeObserver",
  vi.fn<[], ResizeObserver>(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  })),
);
