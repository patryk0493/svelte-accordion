import { render } from "@testing-library/svelte";
import AccordionSection from "./AccordionSection.svelte";
import TestingContext from "../../TestingContext.svelte";
import { CONTEXT_KEY } from "../utils/context-key";
import { createSectionsWritable } from "../utils/create-sections-writable";

it("should render w/o error", () => {
  const id = "unique-id";

  const { getByTestId } = render(TestingContext, {
    props: {
      Component: AccordionSection,
      contextKey: CONTEXT_KEY,
      contextValue: { sections: createSectionsWritable() },
      testedComponentProps: {
        id,
      },
    },
  });

  const section = getByTestId(`accordion-section-${id}`);

  expect(section).toHaveClass("accordion-section");
});
