import { render } from "@testing-library/svelte";
import Chevron from "./Chevron.svelte";

it("should render w/o error", () => {
  const { getByTestId, component } = render(Chevron, {});

  const chevron = getByTestId("chevron");

  expect(chevron).toBeInTheDocument();
});
