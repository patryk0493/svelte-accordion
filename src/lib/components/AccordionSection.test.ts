import { fireEvent, render } from "@testing-library/svelte";
import AccordionSection from "./AccordionSection.svelte";
import TestingContext from "../../TestingContext.svelte";
import { CONTEXT_KEY } from "../utils/context-key";
import { createSectionsWritable } from "../utils/create-sections-writable";

const bootstrap = (props: any) =>
  render(TestingContext, {
    props: {
      Component: AccordionSection,
      contextKey: CONTEXT_KEY,
      contextValue: { sections: createSectionsWritable() },
      testedComponentProps: props,
    },
  });

it("should render w/o error", () => {
  const id = "unique-id";
  const { getByTestId } = bootstrap({ id });

  const section = getByTestId(`accordion-section-${id}`);
  expect(section).toHaveClass("accordion-section");
});

it("should emit event on heading click", async () => {
  const id = "unique-id";
  const { getByTestId } = bootstrap({ id });

  const heading = getByTestId(`heading-${id}`);
  await fireEvent.click(heading);

  const section = getByTestId(`accordion-section-${id}`);
  expect(section).toHaveClass("open");
});
