import { render } from "@testing-library/react";
import Button from "./Button";

/**
 * The test cases for button props
 *
 * 1. Colors props
 * 2. size props
 * 3. border-radius custom & default
 * 4. tagName
 */

describe("1. Testing color props in button", () => {
  it("Should match className when assign color props is 'primary'", () => {
    const { container } = render(<Button color="primary" />);

    const currentButton: any = container.firstChild;

    expect(currentButton.className).toContain("bg-blue-600");
    expect(currentButton.className).toContain("hover:bg-blue-700");
    expect(currentButton.className).toContain("ring-blue-600");
    expect(currentButton.className).toContain("text-gray-50");
  });

  it("Should match className when assign color props is 'secondary'", () => {
    const { container } = render(<Button color="secondary" />);

    const currentButton: any = container.firstChild;

    expect(currentButton.className).toContain("bg-slate-600");
    expect(currentButton.className).toContain("hover:bg-slate-700");
    expect(currentButton.className).toContain("ring-slate-600");
    expect(currentButton.className).toContain("text-gray-50");
  });

  it("Should match className when assign color props is 'white'", () => {
    const { container } = render(<Button color="white" />);

    const currentButton: any = container.firstChild;

    expect(currentButton.className).toContain("bg-white");
    expect(currentButton.className).toContain("shadow-sm");
    expect(currentButton.className).toContain("border");
    expect(currentButton.className).toContain("border-slate-300");
    expect(currentButton.className).toContain("ring-slate-900");
  });
});

describe("2. Testing size props of button component ", () => {
  it("Should matched size medium", () => {
    const { container } = render(<Button size="md" />);

    const element: any = container.firstChild;

    expect(element.className).toContain("px-4 py-2");
    expect(element.className).toContain("text-sm");
  });

  it("Should matched size small", () => {
    const { container } = render(<Button size="sm" />);

    const element: any = container.firstChild;

    expect(element.className).toContain("px-4 py-1");
    expect(element.className).toContain("text-sm");
  });

  it("Should matched size large", () => {
    const { container } = render(<Button size="lg" />);

    const element: any = container.firstChild;

    expect(element.className).toContain("px-6 py-2");
    expect(element.className).toContain("text-md");
  });
});

describe("3. Testing rounding circle in button component ", () => {
  it("Default border-radius style for button", () => {
    const { container } = render(<Button />);

    const element: any = container.firstChild;

    expect(element.className).toContain("rounded-md");
  });

  it("Custom rounded-* in className of button & exclude default rounded of component", () => {
    const { container } = render(<Button className="rounded-full" />);
    const { container: c2 } = render(<Button className="rounded-sm" />);

    const element: any = container.firstChild;

    expect(element.className).not.toContain("rounded-md");
    expect(element.className).toContain("rounded-full");

    const element2: any = c2.firstChild;

    expect(element2.className).not.toContain("rounded-md");
    expect(element2.className).toContain("rounded-sm");
  });
});

describe("4. Testing tagName in button", () => {
  it("Should matched html tag is 'A'", () => {
    const { container } = render(<Button tagName="a">Example</Button>);

    expect(container.firstChild?.nodeName).toBe("A");
  });

  it("Should matched html tag is 'BUTTON'", () => {
    const { container } = render(<Button tagName="button">Example</Button>);

    expect(container.firstChild?.nodeName).toBe("BUTTON");
  });

  it("Should matched html tag is 'DIV'", () => {
    const { container } = render(<Button tagName="div">Example</Button>);

    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  // and more...
});

describe("5. Render exactly content in button", () => {
  it("Should matched text content is 'Example' in button", () => {
    const { container } = render(<Button>Example</Button>);

    expect(container.firstChild?.textContent).toBe("Example");
  });

  it("Should matched text content is 'Example 2 332232' in button", () => {
    const { container } = render(<Button>Example 2 332232</Button>);

    expect(container.firstChild?.textContent).toBe("Example 2 332232");
  });

  // and more...
});
