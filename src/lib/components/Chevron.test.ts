import { render } from "@testing-library/svelte";
import Chevron from "./Chevron.svelte";

it("should render w/o error", () => {
  const { getByTestId } = render(Chevron, {});

  const chevron = getByTestId("chevron");

  expect(chevron).toBeInTheDocument();
});

it("should render with a class", () => {
  const { getByTestId } = render(Chevron, { rotated: true });

  const chevron = getByTestId("chevron");

  expect(chevron).toHaveClass("rotate-90");
});
