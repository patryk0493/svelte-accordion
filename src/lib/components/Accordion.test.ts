import { render } from "@testing-library/svelte";
import Accordion from "./Accordion.svelte";

it("should render w/o error", () => {
  const { getByTestId } = render(Accordion, {});

  const chevron = getByTestId("accordion", { exact: true });

  expect(chevron).toBeInTheDocument();
});
