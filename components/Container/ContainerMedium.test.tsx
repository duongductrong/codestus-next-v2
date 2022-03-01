import { render } from "@testing-library/react";
import ContainerMedium from "./ContainerMedium";

describe("Testing width of container medium", () => {
  it("Maximum width of container is 968px", () => {
    const { getByTestId } = render(<ContainerMedium />);

    const element = getByTestId("container-medium-test");

    expect(getComputedStyle(element).maxWidth).toBe("968px");
  });
});
