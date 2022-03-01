import { render } from "@testing-library/react";
import Giscus from "./Giscus";

describe("Giscus append to document and ready to execution", () => {
  it("Check if the giscus is added to the document body", () => {
    const { getByTestId } = render(<Giscus dataRepoId="test" tagName="div" />);

    const el = getByTestId("giscus-test");

    expect(el.nodeName).toBe("DIV");
  });

  it("Check the giscus has the correct script download content", () => {
    render(<Giscus dataRepoId="test" tagName="div" />);

    const script = document.querySelector(`[data-repo-id="test"]`);

    expect(script?.getAttribute("src")).toBe("https://giscus.app/client.js");
    expect(script?.getAttribute("data-repo-id")).toBe("test");
  });
});
