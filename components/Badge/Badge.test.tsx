import { render } from "@testing-library/react";
import Badge from "./Badge";

describe("1. Testing color props", () => {
  it("Should matched className for color is 'primary'", () => {
    const { container } = render(<Badge color="primary" />);
    const element: HTMLDivElement = container.firstChild as any;

    expect(element.className).toContain("bg-blue-100");
    expect(element.className).toContain("text-blue-600");
  });

  it("Should matched className for color is 'secondary'", () => {
    const { container } = render(<Badge color="secondary" />);
    const element: HTMLDivElement = container.firstChild as any;

    expect(element.className).toContain("bg-slate-100");
    expect(element.className).toContain("text-slate-600");
  });

  it("Should matched className for color is 'none'", () => {
    const { container } = render(<Badge color="none" />);
    const element: HTMLDivElement = container.firstChild as any;

    expect(element.className).not.toContain("bg-blue-100");
    expect(element.className).not.toContain("text-blue-600");
    // or
    expect(element.className).not.toContain("bg-slate-100");
    expect(element.className).not.toContain("text-slate-600");
  });
});

describe("2. Render exactly text content for badge", () => {
  it("Should matched text content is 'Example'", () => {
    const { container } = render(<Badge>Example</Badge>);
    const element: HTMLDivElement = container.firstChild as any;

    expect(element.textContent).toContain("Example");
  });
});

describe("3. Minimum minWidth of badge is 50px", () => {
  it("Should matched minWidth is 50px in badge", () => {
    const { container } = render(<Badge />);
    const element: HTMLDivElement = container.firstChild as any;

    expect(element.style.minWidth).toContain("50px");
  });
});

describe("3. Can custom any html tag", () => {
  it("Should matched tagName is 'DIV'", () => {
    const { container } = render(<Badge tagName="div" />);
    const element: HTMLDivElement = container.firstChild as any;

    expect(element.nodeName).toContain("DIV");
  });

  it("Should matched tagName is 'BUTTON'", () => {
    const { container } = render(<Badge tagName="button" />);
    const element: HTMLDivElement = container.firstChild as any;

    expect(element.nodeName).toContain("BUTTON");
  });

  it("Should matched tagName is 'DIV'", () => {
    const { container } = render(<Badge tagName="div" />);
    const element: HTMLDivElement = container.firstChild as any;

    expect(element.nodeName).toContain("DIV");
  });
});
