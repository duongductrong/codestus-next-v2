import { render } from "@testing-library/react";
import { Fa500Px } from "react-icons/fa";
import CardAuthor from "./CardAuthor";

describe("Display any icon in card author", () => {
  it("The avatar should exist in documents with icon props", () => {
    const Icon = <Fa500Px />;
    const { getByTestId } = render(<CardAuthor icon={Icon} />);

    const avatar = getByTestId("avatar-test");

    expect(avatar.firstChild).toBeInTheDocument();
    expect(avatar.firstChild?.nodeName).toEqual("svg");
  });

  it("The avatar should exist in documents with src props", () => {
    const { getByTestId } = render(
      <CardAuthor
        src={"https://codestus.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar.c3ab5e5e.png&w=640&q=75"}
      />
    );

    const avatar = getByTestId("avatar-test");

    expect(avatar.firstChild).toBeInTheDocument();
    expect(avatar.firstChild?.nodeName).toEqual("IMG");
  });
});

describe("Display content title props in card author", () => {
  it("The title should display exactly content assigned to props", () => {
    const { getByText } = render(<CardAuthor title="@duongductrong" />);

    const avatar = getByText("@duongductrong");

    expect(avatar).toBeInTheDocument();
    expect(avatar.textContent).toEqual("@duongductrong");
  });
});

describe("Display content description props in card author", () => {
  it("The description should display exactly content assigned to props", () => {
    const { getByText } = render(<CardAuthor description="Frontend Developer" />);

    const avatar = getByText("Frontend Developer");

    expect(avatar).toBeInTheDocument();
    expect(avatar.textContent).toEqual("Frontend Developer");
    expect(avatar.textContent).not.toEqual("frontend developer");
  });
});
